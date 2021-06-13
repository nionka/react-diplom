import { 
  CHANGE_CHECKBOX, 
  CHANGE_ORDER_FIELD, 
  FETCH_ORDER_FAILURE, 
  FETCH_ORDER_START, 
  FETCH_ORDER_SUCCESS, 
  UPDATE_CART } from "../actions/actionTypes";

const initialState = {
  owner: { phone: '', address: '' },
  checked: false,
  success: false,
  loading: false,
  error: null,
}

function fetchOrderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_ORDER_FIELD:
      const { name, value } = action.payload;
      return { ...state, owner: { ...state.owner, [name]: value } };
    case CHANGE_CHECKBOX:
      const { checked } = action.payload;
      return { ...state, checked };
    case FETCH_ORDER_START:
      return { ...state, loading: true };
    case FETCH_ORDER_FAILURE:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case FETCH_ORDER_SUCCESS:
      return { ...state, ...initialState, success: true };
    case UPDATE_CART:
      return { ...state, success: false }
    default:
      return state
  }
}

export default fetchOrderReducer