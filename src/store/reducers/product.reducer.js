import * as actionTypes from "../types";
import { updateObject } from "../../utils/utility";

const initialState = {
  loading: false,
  products: null,
};

const getProductsStart = (state, action) => {
  return updateObject(state, { 
    loading: action.loading, products: null 
  });
};

const getProductsSuccess = (state, action) => {
  return updateObject(state, {
    products: action.products,
    loading: false,
  });
};
const refreshUsageProducts = (state, action) => {
  return updateObject(state, {
    products: action.products,
    loading: false,
    refresh: true,
  })
};
const refreshUsageProductsReset = (state, action) => {
  return updateObject(state, {
    products: action.products,
    loading: false,
    refresh: false,
  })
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_START:
      return getProductsStart(state, action);
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return getProductsSuccess(state, action);
    case actionTypes.REFRESH_USAGE_PRODUCTS:
      return refreshUsageProducts(state, action);
    case actionTypes.REFRESH_USAGE_PRODUCTS_RESET:
      return refreshUsageProductsReset(state, action);  
    default:
      return state;
  }
};

export default reducer;
