/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {Checkbox,Table,TableBody,TableCell,TableContainer,TableRow,TextField} from '@mui/material';
import items from '../data/items'
import linq from 'linq';
import * as productActions from "../store/actions/product.actions";
import { connect } from "react-redux";
import Enumerable from 'linq';

function TagCheckList(props) {
  const [checked, setChecked] = useState([0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [tags, setTags] = useState([]);
  const [query, setQuery] = React.useState("");
  const [autoFocusStatus, setAutoFocusStatus] = React.useState(false);
  const [products, setProducts] = useState([]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    let newList = [];
    if (Enumerable.from(newChecked).toArray().length > 1) {
      newList = linq.from(JSON.parse(localStorage.getItem("@products"))).where(
        x => Enumerable.from(newChecked).select(element => element).contains(Enumerable.from(x.tags).forEach(y => y))).toArray();
    } else {
      newList = linq.from(JSON.parse(localStorage.getItem("@products"))).toArray();
    }
    console.log("newchecked: ", Enumerable.from(newChecked).toArray().length);
    console.log("brand tarafinda checkledim",products);
    props.onRefreshUsageProducts(newList);
  };
  const handleChange = (event) => {
    const formattedQuery = event.target.value.toLowerCase();
    if (event.target.value === null || event.target.value === "") {
      linq.from(items).forEach(item => {
        linq.from(item.tags).forEach( tag =>{
            list.push(tag);
        })});
        console.log("list: ",list);
        tagList = linq.from(list).groupBy(
            g => g, 
            element => element, 
            (key, items) => ({key, items: items.toArray(), count: items.toArray().length})).toArray();
        setTags(tagList);
    } else {
      const filteredData = tags.filter(x => x.key.toLowerCase().includes(formattedQuery));
      console.log("filteredData: ",filteredData)
      setTags(filteredData);
    }
    setQuery(event.target.value);
  }
  let list = [];
  let tagList = [];
  let id = 0;
  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      linq.from(items).forEach(item => {
        linq.from(item.tags).forEach( tag =>{
            list.push(tag);
        })});
        console.log("list: ",list);
        tagList = linq.from(list).groupBy(
            g => g, 
            element => element, 
            (key, items) => ({key, items: items.toArray(), count: items.toArray().length})).toArray();
        console.log("tagList: ",tagList);
        setTags(tagList);
    }
    if (props.refresh === true) {
      setProducts(props.products);
    }
    if (props.loaded === true) {
      props.onGetProductsReset();
      console.log('buraya geliyor mu')
      setProducts(props.products);
    }
  }, [isLoaded, tagList])
  
  return (
    <TableContainer sx={{ maxHeight: 240 }}>
      <TextField
                    id="standard-search"
                    label="Search..."
                    onChange={handleChange}
                    type="search"
                    variant="standard"
                    className="px-3 justify-content-between"
                    color="secondary"
                    value={query}
                    onFocus={() => setAutoFocusStatus(true)}
                    autoFocus={autoFocusStatus}
              />
    <Table stickyHeader aria-label="sticky table">
      <TableBody>
        {
          tags.map((tag) =>{
          const labelId = `checkbox-list-label-${tag}`;
                      return (
                        <TableRow hover key={id = tag+(id + 1)} role="checkbox" tabIndex={-1} onClick={handleToggle(tag)}>
                          <TableCell sx={{maxWidth: 15}}>
                            <Checkbox
                              color="secondary"
                              edge="start"
                              checked={checked.indexOf(tag) !== -1}
                              tabIndex={-1}
                              disableRipple
                              inputProps={{ 'aria-labelledby': labelId }}
                            />
                          </TableCell>
                            <TableCell>
                              {tag.key} ({tag.count})
                            </TableCell>
                        </TableRow>
                      );}       
                )
        }
      </TableBody>
    </Table>
  </TableContainer>
  );
}
const mapStateToProps = (state) => {
  return {
    errors: state.product.errors,
    loading: state.product.loading,
    products: state.product.products,
    refresh: state.product.refresh,
    loaded: state.product.loaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRefreshUsageProducts: (products) => dispatch(productActions.refreshUsageProducts(products)),
    onRefreshUsageProductsReset: () => dispatch(productActions.refreshUsageProductsReset()),
    onGetProductsReset: () => dispatch(productActions.getProductsReset())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagCheckList);