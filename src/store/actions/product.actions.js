import * as actionTypes from "../types";
import items from '../../data/items';

export const getProducts = () => {
  return (dispatch) => {
    dispatch(getProductsStart());
    dispatch(getProductsSuccess(items));
}};

export const getProductsStart = () => {
  localStorage.setItem("@products", JSON.stringify(items));
  return {
    type: actionTypes.GET_PRODUCTS_START,
    loading: true,
  };
};

export const getProductsSuccess = (products) => {
  return {
    type: actionTypes.GET_PRODUCTS_SUCCESS,
    products: products,
    loaded: true,
  };
};
export const getProductsReset = () => {
  return {
    type: actionTypes.GET_PRODUCTS_RESET,
    loaded: false,
  };
};
export const refreshUsageProducts = (products) => {
  return {
    type: actionTypes.REFRESH_USAGE_PRODUCTS,
    products: products,
    refresh: true,
  };
};
export const refreshUsageProductsReset = () => {
  return {
    type: actionTypes.REFRESH_USAGE_PRODUCTS_RESET,
    refresh: false,
  };
};


