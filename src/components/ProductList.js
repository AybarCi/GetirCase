/* eslint-disable array-callback-return */
import React, {useEffect, useState} from 'react';
import linq from 'linq';
import { CCard,CCardBody, CCardText,CButton,CImg,CCardTitle } from "@coreui/react";
import { connect } from "react-redux";
import * as basketActions from "../store/actions/basket.actions";
import * as productActions from "../store/actions/product.actions";
import usePagination from "../components/Pagination";
import Pagination from '@mui/material/Pagination';

const ProductList = (props) => {
  const [products,setProducts] = useState([]);
  
  const basketList = [];

  let [page, setPage] = useState(1);
  const PER_PAGE = 15;

  const count = Math.ceil(products.length / PER_PAGE);
  const _DATA = usePagination(products, PER_PAGE);

  const handleChange = (e, p) => {
    console.log("p: ", p);
    setPage(p);
    _DATA.jump(p);
  };
  
  function moveToBasket(item) {
    if (props.basket !== null) {
      linq.from(props.basket).forEach(element => {
        basketList.push(element)
      })
      basketList.push(item);
    } else {
      basketList.push(item);
    }
    props.onRefreshBasket(basketList);
  }
  useEffect(() => {
    /* if (products.length === 0) {
      setProducts(linq.from(JSON.parse(localStorage.getItem("@products"))).toArray())
    } */
    if (props.refresh === true) {
      //props.onRefreshUsageProductsReset();
      setProducts(props.products);
    }
    if (props.loaded === true) {
      console.log('loaded sonrasi')
      setProducts(props.products);
    }
  }, [products.length, props])
  return (
    <>
          {_DATA.currentData().map(item => {
              return (<CCard key={item.added} className="justify-content-between" style={{ width: '18rem' }}>
              {item.itemType === "mug" ? (
                <CImg orientation="top" src="https://stampida.es/421-large_default/mug-wwf.jpg" />    
              ):(
                <CImg orientation="top" src="https://images.teemill.com/5ddfefff738022.89422750.png.jpg?w=640&h=auto" />
              )}
              
              <CCardBody>
                <CCardTitle>{item.name} (${item.price})</CCardTitle>
                <CCardText>
                  {item.manufacturer}
                </CCardText>
                <CButton onClick={() => moveToBasket(item)}>Add to Cart</CButton>
              </CCardBody>
              </CCard>) 
            })}
      <Pagination className="py-2" count={count} page={page} color="secondary" onChange={handleChange} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    basket: state.basket.basket,
    products: state.product.products,
    refresh: state.product.refresh,
    loaded: state.product.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onGetProducts: () => dispatch(productActions.getProducts()),
    onGetProductsReset: () => dispatch(productActions.getProductsReset()),
    onRefreshBasket: (basket) => dispatch(basketActions.refreshBasket(basket)),
    onRefreshUsageProductsReset: () => dispatch(productActions.refreshUsageProductsReset()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);