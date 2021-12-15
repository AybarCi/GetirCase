import * as actionTypes from "../types";
import { updateObject } from "../../utils/utility";

const initialState = {
  basket: null,
};

const refreshBasket = (state, action) => {
  return updateObject(state, { 
    basket: action.basket 
  });
};

const removeBasket = (state, action) => {
  return updateObject(state, {
    basket: action.basket,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.REFRESH_BASKET:
      return refreshBasket(state, action);
    case actionTypes.REMOVE_BASKET:
      return removeBasket(state, action);
    default:
      return state;
  }
};

export default reducer;
