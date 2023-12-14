import { GET_ALL_MENU, SET_ALL_MENU } from "./constants";

export const setAllMenu = (data) => ({
  type: SET_ALL_MENU,
  data
})

export const getAllMenu = () => ({
  type: GET_ALL_MENU
})