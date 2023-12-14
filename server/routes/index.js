const express = require('express')
const { getAllMenu, createMenu, deleteMenu, updateMenu } = require('../controllers/menuController')
const router = express.Router()
const upload = require('../helpers/multer')

router.get('/menu/all', getAllMenu)
router.post('/menu/create', upload.single('image'), createMenu)
router.put('/menu/update/:id', updateMenu)
router.delete('/menu/delete/:id', deleteMenu)

module.exports = router