import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from 'redux-thunk';
import cartReducer from "../reducers/cartReducer";
import fetchCatalogReducer from "../reducers/fetchCatalogReducer";
import fetchCategoriesReducer from "../reducers/fetchCategoriesReducer";
import fetchOrderReducer from "../reducers/fetchOrderReducer";
import fetchProductReducer from "../reducers/fetchProductReducer";
import fetchSearchReducer from "../reducers/fetchSearchReducer";
import fetchTopReducer from "../reducers/fetchTopReducer";

const reducer = combineReducers({
  topFetch: fetchTopReducer,
  categoriesFetch: fetchCategoriesReducer,
  catalogFetch: fetchCatalogReducer,
  searchFetch: fetchSearchReducer,
  productFetch: fetchProductReducer,
  productsInCart: cartReducer,
  orderFetch: fetchOrderReducer,
});

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  )
)

export default store