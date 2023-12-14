/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useDispatch } from "react-redux";
import { createMenu } from './actions';

import classes from './style.module.scss'

const CreateMenu = () => {
  const dispatch = useDispatch()
  const [error, setError] = useState({})
  const [menuData, setMenuData] = useState({
    name: '',
    price: '',
  })

  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target
    setMenuData((prevData) => ({
      ...prevData,
      [name]: value,
    }))

    setError({
      ...error,
      [name]: ''
    })
  }

  // Validate Form
  const validateForm = () => {
    let valid = true
    const newError = {}

    if (menuData.name === '') {
      newError.name = '*Name is Required'
      valid = false
    }

    if (menuData.price === '') {
      newError.price = '*Price is Required'
      valid = false
    }

    setError(newError)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    let menuDataObj = new FormData();
    menuDataObj.append('name', menuData.name);
    menuDataObj.append('price', menuData.price);
    menuDataObj.append('image', file);

    dispatch(createMenu(menuDataObj))
  }

  return (
    <div className={classes.container}>
      <div className={classes.container__table}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div className={classes.tableChild}>
            <h1 className={classes.title}> Tambahkan Menu </h1>
            {/* Name */}
            <div className={classes.formName}>
              <h1 className={classes.titleName}> Nama Menu </h1>
              <input
                className={classes.inputTextName}
                type="text"
                id="name"
                name="name"
                value={menuData.name}
                onChange={handleChange}
              />
              <div className={classes.error}> {error.name} </div>
            </div>

            {/* Image */}
            <div className={classes.formImage}>
              <h1 className={classes.titleImage}> Gambar Menu </h1>
              {/* <div className={classes.dragArea}>
              <span className={classes}> drag and drop file here or click </span>
            </div> */}
              <input
                className={classes.inputTextImage}
                id="image"
                name="image"
                autoComplete="current-image"
                value={menuData.image}
                onChange={handleFileChange}
                type="file"
              />

              {/* Display the selected image */}
              {file && (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className={classes.selectedImage}
                />
              )}
              <div className={classes.error}> {error.image} </div>
            </div>

            {/* Price */}
            <div className={classes.formPrice}>
              <h1 className={classes.titlePrice}> Harga Menu </h1>
              <input
                className={classes.inputTextPrice}
                type="number"
                id="price"
                name="price"
                value={menuData.price}
                onChange={handleChange}
              />
              <div className={classes.error}> {error.price} </div>
            </div>

            <div className={classes.btnAdd}>
              <button className={classes.button} type='submit'>
                Simpan
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateMenu
