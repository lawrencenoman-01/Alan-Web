/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { FormatRupiah } from "@arismun/format-rupiah";
import Swal from 'sweetalert2'
import Avatar from '../../assets/iconAvatar.png'

import classes from "./style.module.scss";
import { getAllMenu } from '../Home/actions';

const Transaction = () => {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.homeReducer.menu)
  console.log(menus);
  useEffect(() => {
    dispatch(getAllMenu())
  }, [dispatch])

  const [orderList, setOrderList] = useState([])
  const handleImageClick = (menu) => {
    const existingMenu = orderList.find((orderMenu) => orderMenu.id === menu.id)

    if (existingMenu) {
      setOrderList((order) => order.map((orderMenu) => orderMenu.id === menu.id ? { ...orderMenu, quantity: orderMenu.quantity + 1 } : orderMenu))
    } else {
      setOrderList((order) => [...order, {...menu, quantity: 1 }])
    }
  }

  // Pop-up Save Bill
  const showSaveBill = () => {
    if (orderList.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Whoopss...',
        text: 'You must purchase at least one menu item before saving the bill!'
      })
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Bill Saved!',
        text: 'Your bill has been saved successfully.',
      });
    }
  }

  // Print Bill
  const printBill = () => {
    window.print()
  }

  // Total Charge
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const totalPrice = orderList.reduce((total, order) => {
      return total + order.price * order.quantity
    }, 0)

    setTotal(totalPrice)
  }, [orderList])

  return (
    <div className={classes.container}>
      <div className={classes.container__list}>
        <div className={classes.container__list__left}>
          {menus.map((menu) => {
            return (
              <div className={classes.card} key={menu.id} onClick={() => handleImageClick(menu)}>
                <img className={classes.image} src={menu.image} alt='' />
                <div className={classes.card__content}>
                  <p className={classes.name}> {menu.name} </p>
                  <p className={classes.price}> <FormatRupiah value={menu.price} /> </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className={classes.container__list__right}>
          <div className={classes.title}>
            <img src={Avatar} />
            <h1> Pesanan </h1>
          </div>
          <div className={classes.body}>
            {orderList.map((orderMenu) => (
              <div className={classes.body__menu} key={orderMenu.id}>
                <img src={orderMenu.image} className={classes.orderImage} />
                <p className={classes.orderName}> {orderMenu.name} </p>
                <p className={classes.orderQuantity}> x{orderMenu.quantity} </p>
                <p className={classes.orderPrice}> <FormatRupiah value={orderMenu.price * orderMenu.quantity} /> </p>
              </div>
            ))}
          </div>
          <div className={classes.footer}>
            <button className={classes.btnClear} onClick={() => setOrderList([])}>
              Clear Cart
            </button>
            <div className={classes.bill}>
              <button className={classes.btnSave} onClick={() => showSaveBill()}>
                Save Bill
              </button>
              <button className={classes.btnPrint} onClick={() => printBill()}>
                Print Bill
              </button>
            </div>
            <button className={classes.btnCharge} >
              Charge - <FormatRupiah value={total} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Transaction
