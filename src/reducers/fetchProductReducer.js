import { 
  CHOOSE_SIZE, 
  FETCH_PRODUCT_FAILURE, 
  FETCH_PRODUCT_START, 
  FETCH_PRODUCT_SUCCESS, 
  NUMBER_DEC, 
  NUMBER_INC } from "../actions/actionTypes";

const initialState = {
  item: [],
  loading: false,
  error: null,
  checkSize: '',
  number: 1,
}

function fetchProductReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PRODUCT_START:
      return { ...initialState, loading: true };
    case FETCH_PRODUCT_FAILURE:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case FETCH_PRODUCT_SUCCESS:
      const { item } = action.payload;
      return { ...state, item, loading: false, error: null };
    case CHOOSE_SIZE:
      const { size } = action.payload;
      return { ...state, checkSize: size };
    case NUMBER_INC:
      return { ...state, number: state.number + 1 };
    case NUMBER_DEC:
      return { ...state, number: state.number - 1 };
    default:
      return state
  }
}

export default fetchProductReducer