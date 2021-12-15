import React, {useEffect, useState} from 'react';
import {Checkbox,Table,TableBody,TableCell,TableContainer,TableRow,TextField } from '@mui/material';
import companies from '../data/companies'
import items from '../data/items'
import linq from 'linq';
import * as productActions from "../store/actions/product.actions";
import { connect } from "react-redux";
import Enumerable from 'linq';

function BrandCheckList(props) {
  const [checked, setChecked] = React.useState([0]);
  const [query, setQuery] = React.useState("");
  const [autoFocusStatus, setAutoFocusStatus] = React.useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  
  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
    console.log("newchecked: ", newChecked);

    let storageProductList = [];
    let newList = [];
    storageProductList = linq.from(props.products).toArray();
    newList = linq.from(storageProductList).where(x => Enumerable.from(newChecked).select(element => element.slug).contains(x.manufacturer)).toArray();
    props.onRefreshUsageProducts(newList);
  };

  const handleChange = (event) => {
    const formattedQuery = event.target.value.toLowerCase();
    if (event.target.value === null || event.target.value === "") {
      setCompanyList(linq.from(companies).toArray());
    } else {
      const filteredData = companyList.filter(x => x.name.toLowerCase().includes(formattedQuery));
      console.log("filteredData: ",filteredData)
      setCompanyList(filteredData);
    }
    setQuery(event.target.value);
  }
  useEffect(() => {
    if (!isLoaded) {
      setIsLoaded(true);
      setCompanyList(linq.from(companies).groupJoin(
                      Enumerable.from(items),
                      pk => pk.slug,
                      fk => fk.manufacturer,
                      (company, items) => ({...company, items: items.toArray(), count: items.toArray().length})
                    ).toArray());
    }
  }, [isLoaded])
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
            companyList.map((company) =>{
            const labelId = `checkbox-list-label-${company.account}`;
            return (
                    <TableRow hover key={company.name} role="checkbox" tabIndex={-1} onClick={handleToggle(company)}>
                      <TableCell>
                        <Checkbox
                          color="secondary"
                          edge="start"
                          checked={checked.indexOf(company) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                        <TableCell>
                          {company.name} ({company.count})
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

export default connect(mapStateToProps, mapDispatchToProps)(BrandCheckList);