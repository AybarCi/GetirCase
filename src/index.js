import "react-app-polyfill/ie11"; // For IE 11 support
import "react-app-polyfill/stable";
import "./polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import productReducer from "./store/reducers/product.reducer";
import companyReducer from "./store/reducers/company.reducer";
import basketReducer from "./store/reducers/basket.reducer";
import { icons } from "./assets/icons";
import { Provider } from "react-redux";

React.icons = icons;

const rootReducer = combineReducers({
  product: productReducer,
  company: companyReducer,
  basket: basketReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
