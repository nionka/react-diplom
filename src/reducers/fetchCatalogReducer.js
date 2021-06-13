import { 
  FETCH_CATALOG_FAILURE, 
  FETCH_CATALOG_START, 
  FETCH_CATALOG_SUCCESS, 
  FETCH_MORE_FAILURE, 
  FETCH_MORE_HIDE, 
  FETCH_MORE_START, 
  FETCH_MORE_SUCCESS } from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
  disabled: false,
  hide: false,
  loadingBtn: false,
  errorBtn: null,
}

function fetchCatalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATALOG_START:
      return { ...state, loading: true, error: null, hide: false, disabled: false, loadingBtn: false, errorBtn: null };
    case FETCH_CATALOG_FAILURE:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case FETCH_CATALOG_SUCCESS:
      const { items } = action.payload;
      return { ...state, items, loading: false, error: null };
    case FETCH_MORE_START:
      return { ...state, disabled: true, loadingBtn: true };
    case FETCH_MORE_FAILURE:
      return { ...state, disabled: false, loadingBtn: false, errorBtn: action.payload.error };
    case FETCH_MORE_HIDE:
      const { itemMore } = action.payload;
      return { ...state, items: [...state.items, ...itemMore], hide: true, disabled: false, loadingBtn: false, errorBtn: null };
    case FETCH_MORE_SUCCESS:
      const { itemsMore } = action.payload;
      return { ...state, items: [ ...state.items, ...itemsMore], disabled: false, hide: false, loadingBtn: false, errorBtn: null }
    default:
      return state
  }
}

export default fetchCatalogReducer