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

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    
    let storageProductList = [];
    let newList = [];
    storageProductList = linq.from(JSON.parse(localStorage.getItem("@products"))).toArray();
    console.log("newChecked: ",newChecked)
    newList = linq.from(storageProductList).where(x => Enumerable.from(newChecked).select(element => element).contains(Enumerable.from(x.tags).select(y => y))).take(15).toArray();
    console.log("newList: ",newList);
    props.onRefreshUsageProducts(newList);
  };
  const handleChange = (event) => {
    const formattedQuery = event.target.value.toLowerCase();
    if (event.target.value === null || event.target.value === "") {
      linq.from(items).forEach(item => {
        linq.from(item.tags).forEach( tag =>{
            tagList.push(tag);
        })});
        setTags(tagList);
    } else {
      const filteredData = tags.filter(x => x.toLowerCase().includes(formattedQuery));
      console.log("filteredData: ",filteredData)
      setTags(filteredData);
    }
    setQuery(event.target.value);
  }
  let tagList = [];
  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      linq.from(items).forEach(item => {
        linq.from(item.tags).forEach( tag =>{
            tagList.push(tag);
        })});
        setTags(tagList);
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
          linq.from(tags).distinct().toArray().map((tag) =>{
          const labelId = `checkbox-list-label-${tag}`;
                      return (
                        <TableRow hover key={tag} role="checkbox" tabIndex={-1} onClick={handleToggle(tag)}>
                          <TableCell>
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
                              {tag}
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRefreshUsageProducts: (products) => dispatch(productActions.refreshUsageProducts(products)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TagCheckList);