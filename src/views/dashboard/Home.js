/* eslint-disable array-callback-return */
import React, {useEffect, useState} from "react";
import { CContainer, CCol, CRow, CButtonGroup , CCard,CCardBody } from "@coreui/react";
import {FormControlLabel,RadioGroup,Radio,Button,ButtonGroup,Typography} from '@mui/material';
import * as productActions from "../../store/actions/product.actions";
import * as companyActions from "../../store/actions/company.actions";
import { connect } from "react-redux";

import ProductList from "../../components/ProductList";
import BrandCheckList from '../../components/BrandCheckList';
import TagCheckList from "../../components/TagCheckList";
import linq from 'linq';

const Home = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  function handleItemTypeChanged (event, text) {
    let storageProductList = [];
    let newList = [];
    storageProductList = linq.from(JSON.parse(localStorage.getItem("@products"))).toArray();
    newList = linq.from(storageProductList).where(element => element.itemType === text).toArray();
    props.onRefreshUsageProducts(newList);
  }
  function handleSortingChanged (event, text) {
    let storageProductList = [];
    let newList = [];
    if (text === "lowtohigh") {
      console.log("lowtohigh");
      storageProductList = linq.from(JSON.parse(localStorage.getItem("@products"))).toArray();
      newList = linq.from(storageProductList).orderBy(element => element.price).toArray();    
    } else if (text === "hightolow") {
      console.log("hightolow");
      storageProductList = linq.from(JSON.parse(localStorage.getItem("@products"))).toArray();
      newList = linq.from(storageProductList).orderByDescending(element => element.price).toArray();
    } else if (text === "newtoold") {
      console.log("newtoold");
      storageProductList = linq.from(JSON.parse(localStorage.getItem("@products"))).toArray();
      newList = linq.from(storageProductList).orderByDescending(element => element.added).toArray();
    } else if (text === "oldtonew") {
      console.log("oldtonew");
      storageProductList = linq.from(JSON.parse(localStorage.getItem("@products"))).toArray();
      newList = linq.from(storageProductList).orderBy(element => element.added).toArray();
    }
    props.onRefreshUsageProducts(newList);
  }
  
  useEffect(() => {
    if (!isLoaded) {
      props.onGetProducts();
      setIsLoaded(true);
    }
  }, [isLoaded, props])
  return (
    <>
    <CContainer>
      <CRow>
        <CCol md="3">
          <CRow>
            <Typography variant="h5" component="h2">
              Sorting
            </Typography>
          </CRow>
          <CRow>
            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                  <RadioGroup row aria-label="sorting" name="row-radio-buttons-group">
                    <FormControlLabel id="lowtohigh" onClick={(e) => handleSortingChanged(e, "lowtohigh")} value="lowtohigh" control={<Radio color="secondary" />} label="Price low to high" />
                    <FormControlLabel id="hightolow" onClick={(e) => handleSortingChanged(e, "hightolow")} value="hightolow" control={<Radio color="secondary" />} label="Price high to low" />
                    <FormControlLabel id="newtoold" onClick={(e) => handleSortingChanged(e, "newtoold")} value="newtoold" control={<Radio color="secondary" />} label="New to old" />
                    <FormControlLabel id="oldtonew" onClick={(e) => handleSortingChanged(e, "oldtonew")} value="oldtonew" control={<Radio color="secondary" />} label="Old to new" />
                  </RadioGroup>
                </CCardBody>
            </CCard>
          </CRow>
          <CRow>
            <Typography variant="h5" component="h2">
              Brands
            </Typography>
          </CRow>
          <CRow>
            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                  <BrandCheckList/>
                </CCardBody>
            </CCard>
          </CRow>
          <CRow>
            <Typography variant="h5" component="h2">
              Tags
            </Typography>
          </CRow>
          <CRow>
            <CCard style={{ width: '18rem' }}>
                <CCardBody>
                  <TagCheckList/>
                </CCardBody>
            </CCard>
          </CRow>
        </CCol>
        <CCol lg="9">
          <CRow>
            <CRow>
              <CCol>
                <CRow>
                  <Typography variant="h4" component="h2">
                    Products
                  </Typography>
                </CRow>
                <CRow className="py-3 justify-content-between">
                  <CButtonGroup>
                    <ButtonGroup variant="outlined" color="secondary" aria-label="outlined button group">
                      <Button onClick={(e) => handleItemTypeChanged(e, "mug")}>Mug</Button>
                      <Button onClick={(e) => handleItemTypeChanged(e, "shirt")}>Shirt</Button>
                    </ButtonGroup>
                  </CButtonGroup> 
                </CRow>
              </CCol>
            </CRow>
            <CRow>
              <ProductList/>
            </CRow>
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    errors: state.product.errors,
    loading: state.product.loading,
    products: state.product.products,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProducts: () => dispatch(productActions.getProducts()),
    onGetCompanies: () => dispatch(companyActions.getCompanies()),
    onRefreshUsageProducts: (products) => dispatch(productActions.refreshUsageProducts(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
