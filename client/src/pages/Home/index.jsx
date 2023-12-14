/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FormatRupiah } from "@arismun/format-rupiah";

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import AddIcon from '@mui/icons-material/Add';

import classes from "./style.module.scss";
import { getAllMenu } from "./actions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#F0F0F0',
    color: theme.palette.common.black,
    fontWeight: 700,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const Home = () => {
  const dispatch = useDispatch()
  const menus = useSelector((state) => state.homeReducer.menu)
  console.log(menus);
  useEffect(() => {
    dispatch(getAllMenu())
  }, [dispatch])

  return (
    <div className={classes.container}>
      <div className={classes.container__title}> Tambahkan menu makanan yang ada di resto. </div>
      <div className={classes.container__table}>
        <div className={classes.tableChild}>
          <Link to={'/add'} className={classes.btnAdd}>
            <button className={classes.button}>
              <AddIcon /> Tambah Menu
            </button>
          </Link>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }}>
              <TableHead>
                <TableRow>
                  <StyledTableCell> No </StyledTableCell>
                  <StyledTableCell align="left"> Nama </StyledTableCell>
                  <StyledTableCell align="center"> Foto </StyledTableCell>
                  <StyledTableCell align="right"> Harga </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menus.map((menu) => (
                  <StyledTableRow key={menu.id}>
                    <StyledTableCell component='th' scope="row"> {menu.id} </StyledTableCell>
                    <StyledTableCell align="left"> {menu.name} </StyledTableCell>
                    <StyledTableCell align="center">
                      <img src={menu.image} alt={menu.name} className={classes.image} />
                    </StyledTableCell>
                    <StyledTableCell align="right"> <FormatRupiah value={menu.price} /> </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {/* <div className={classes.container__footer}> Alan Resto @ 2020 | Develop by Lawrence </div> */}
    </div>
  );
};

export default Home;
