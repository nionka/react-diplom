import { FETCH_TOP_FAILURE, FETCH_TOP_START, FETCH_TOP_SUCCESS } from "../actions/actionTypes";

const initialState = {
  items: [],
  loading: false,
  error: null,
}

function fetchTopReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOP_START:
      return { ...state, items: [], loading: true, error: null };
    case FETCH_TOP_FAILURE:
      const { error } = action.payload;
      return { ...state, items: [], loading: false, error };
    case FETCH_TOP_SUCCESS:
      const { items } = action.payload;
      return { ...state, items, loading: false, error: null }; 
    default:
      return state;
  }
}

export default fetchTopReducer