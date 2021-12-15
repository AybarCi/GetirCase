import * as actionTypes from "../types";
import { updateObject } from "../../utils/utility";

const initialState = {
  error: null,
  loading: false,
  companies: null,
};

const getCompaniesStart = (state, action) => {
  return updateObject(state, { error: null, loading: true, products: null });
};

const getCompaniesSuccess = (state, action) => {
  return updateObject(state, {
    devices: action.devices,
    error: null,
    loading: false,
  });
};

const getCompaniesFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
    devices: null,
  });
};



const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_COMPANIES_START:
      return getCompaniesStart(state, action);
    case actionTypes.GET_COMPANIES_SUCCESS:
      return getCompaniesSuccess(state, action);
    case actionTypes.GET_COMPANIES_FAIL:
      return getCompaniesFail(state, action);
    default:
      return state;
  }
};

export default reducer;
