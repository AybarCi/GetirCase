import * as actionTypes from "../types";

export const refreshBasket = (basket) => {
  return {
    type: actionTypes.REFRESH_BASKET,
    basket: basket,
  };
};

export const removeBasket = () => {
  return {
    type: actionTypes.REMOVE_BASKET,
    basket: null,
  };
};
