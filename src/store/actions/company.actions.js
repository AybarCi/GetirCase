import * as actionTypes from "../types";

export const getCompanies = () => {
  return (dispatch) => {
    dispatch(getCompaniesStart());
    fetch('companies.json',
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        }
      )
      .then((res) => res.json())
      .then(
        (response) => {
          dispatch(getCompaniesSuccess(response));
        },
        (err) => {
          dispatch(getProductsFail(err));
        }
      );
  };
};

export const getCompaniesStart = () => {
  return {
    type: actionTypes.GET_COMPANIES_START,
  };
};

export const getCompaniesSuccess = (companies) => {
  return {
    type: actionTypes.GET_COMPANIES_SUCCESS,
    companies: companies,
  };
};

export const getProductsFail = (error) => {
  return {
    type: actionTypes.GET_COMPANIES_FAIL,
    error: error,
  };
};
