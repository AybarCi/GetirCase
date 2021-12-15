import React, {useState} from 'react';
import {Badge,Button,Box,Popper,Fade,Paper,Table,TableBody,TableCell,TableContainer,TableRow} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { connect } from "react-redux";
import * as basketActions from "../store/actions/basket.actions";
import linq from 'linq';
import items from '../data/items';


function BasketBadge(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState();
  
  let basketBase = props.basket;
  let basket = linq.from(basketBase)
  .groupBy(g => g.added, element => element, (key,items) =>({
    key, items: items.toArray(), count: items.toArray().length, sum: items.sum(item => item.price)})).toArray();

  const handleClick = (newPlacement) => (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => placement !== newPlacement || !prev);
    setPlacement(newPlacement);
  };

  let productListForRefresh = [];
  function addProduct(item){
    let foundItem = linq.from(items).where(element => element.added === item.key).firstOrDefault();
    if (props.basket !== null) {
      linq.from(props.basket).forEach(element => {
        productListForRefresh.push(element)
      })
      productListForRefresh.push(foundItem);
    } else {
      productListForRefresh.push(foundItem);
    }
    props.onRefreshBasket(productListForRefresh);
  }
  function removeProduct(item) {
    let addedCount = 1;
    let itemCount = item.count;
    if (props.basket !== null) {
      linq.from(props.basket).forEach(element => {
        if (element.added !== item.key) {
          productListForRefresh.push(element)  
        }
        if (element.added === item.key) {
          if (addedCount < itemCount) {
            if (itemCount > 1) {
              addedCount = addedCount + 1;
              itemCount = itemCount -1
              productListForRefresh.push(element);  
            }
          }
        } 
      }) 
    }
    props.onRefreshBasket(productListForRefresh);
  }
  return (
    <Box sx={{ width: 500 }}>
    <Popper open={open} anchorEl={anchorEl} placement={placement} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 350 }} aria-label="simple table">
        <TableBody>
          {basket.map(item => {
            return(
              <TableRow
              //key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {item.items[0].name}
                </TableCell>
                <TableCell component="th" scope="row">
                  ${item.sum}
                </TableCell>
                <TableCell align="right">
                  <Button onClick={() => removeProduct(item)}>
                    <RemoveCircleRoundedIcon color="secondary" sx="small"/>
                  </Button>
                </TableCell>
                <TableCell align="right">{item.count}</TableCell>
                <TableCell align="right">
                  <Button onClick={() => addProduct(item)}>
                    <AddCircleRoundedIcon color="secondary" sx="small"/>
                  </Button>
                </TableCell>
              </TableRow>
            ) 
          })}
          <TableRow>
            <TableCell align="left">
              Total Price: {linq.from(basket).sum(item => item.sum)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
            </Paper>
          </Fade>
        )}
      </Popper>
      <Button onClick={handleClick('bottom-end')}>
        {props.basket == null ? (
          <Badge badgeContent={0} color="secondary">
            <ShoppingBasketIcon color="secondary" sx={{ fontSize: 40 }}/>
          </Badge>
        ) : (
          <Badge badgeContent={props.basket.length} color="secondary">
            <ShoppingBasketIcon color="secondary" sx={{ fontSize: 40 }}/>
          </Badge>
        )}
        
      </Button>
      </Box>
    );
  }

  const mapStateToProps = (state) => {
    return {
      basket: state.basket.basket,
      products: state.product.products,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      onRefreshBasket: (
        basket
      ) =>
        dispatch(
          basketActions.refreshBasket(
            basket
          )
        ),
    };
  };
  export default connect(mapStateToProps, mapDispatchToProps)(BasketBadge);