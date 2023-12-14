const { Menu } = require('../models')
const { handleServerError, handleResponse } = require('../helpers/responseHandler');
const fs = require('fs')
const path = require('path')
const Joi = require('joi');

// Get All Menu
exports.getAllMenu = async (req, res) => {
  try {
    const menu = await Menu.findAll()
    
    return handleResponse(res, 200, menu)
  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Create Menu
exports.createMenu = async (req, res) => {
  try {
    const newData = req.body
    const { name } = newData

    if (req.file) {
      const imageURL = req.file.path.replace(/\\/g, "/");
      newData.image = `http://localhost:8000/${imageURL}`;
    }
    
    const schemeMenu = Joi.object({
      name: Joi.string().min(5).required(),
      image: Joi.string().uri().required(),
      price: Joi.number().required()
    })

    const { error } = schemeMenu.validate(newData)
    if (error) {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleResponse(res, 400, { message: error.details[0].message })
    }

    const nameExist = await Menu.findOne({ where: { name }})
    if (nameExist) {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleResponse(res, 404, { message: 'Menu Name Already Exist' })
    }

    const menu = await Menu.create(newData)
    
    return handleResponse(res, 201, { message: { menu, message: 'Created Menu Successfully'}})
    
  } catch (err) {
    if(req.file) {
      fs.unlinkSync(req.file.path)
    }
    console.log(err);
    handleServerError(res)
  }
}

// Update Menu
exports.updateMenu = async (req, res) => {
  try {
    const { id } = req.params
    const newData = req.body

    const menuScheme = Joi.object({
      name: Joi.string().min(5).required(),
      price: Joi.number().required()
    })

    const { error } = menuScheme.validate(newData)
    if (error) {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleResponse(res, 404, { message: error.details[0].message })
    }
    
    const menu = await Menu.findByPk(id)
    if (!menu) {
      if(req.file) {
        fs.unlinkSync(req.file.path)
      }
      return handleResponse(res, 404, { message: 'ID Menu Not Found' })
    }

    if (req.file) {
      const imageURL = req.file.path.replace(/\\/g, "/");
      newData.image = `http://localhost:8000/${imageURL}`;
      if (product.image) {
        const lastImage = path.join(__dirname, "..", "uploads", product.image.split("/").pop());
        fs.unlinkSync(lastImage);
      }
    }

    await menu.update(newData)
    const updateMenu = await Menu.findByPk(id)

    return handleResponse(res, 200, { message: { updateMenu, message: 'Menu Updated Successfully' }})

  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}

// Delete Menu
exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params
    const findMenu = await Menu.findByPk(id)

    if (!findMenu) {
      return handleResponse(res, 404, { message: 'ID Menu Not Found' })
    }

    if (findMenu.image) {
      const lastImage = path.join(__dirname, "..", "uploads", findProduct.image.split("/").pop());
      if (fs.existsSync(lastImage)) {
        fs.unlinkSync(lastImage);
      }
    }

    await findMenu.destroy()

    return handleResponse(res, 200, { message: 'Menu Deleted' })
    
  } catch (err) {
    console.log(err);
    handleServerError(res)
  }
}