import { 
  CHANGE_CATEGORY, 
  FETCH_CATEGORIES_FAILURE, 
  FETCH_CATEGORIES_START, 
  FETCH_CATEGORIES_SUCCESS } from "../actions/actionTypes";

const initialState = {
  categories: [
    {id: 0, title: 'Все'}
  ],
  loading: false,
  error: null,
  change: 0,
}

function fetchCategoriesReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_START:
      return { ...state, loading: true };
    case FETCH_CATEGORIES_FAILURE:
      const { error } = action.payload;
      return { ...state, loading: false, error };
    case FETCH_CATEGORIES_SUCCESS:
      const { categories } = action.payload;
      return { ...state, categories: [...initialState.categories, ...categories], loading: false, error: null };
    case CHANGE_CATEGORY:
      const { category } = action.payload;
      return { ...state, change: category };
    default:
      return state;
  }
}

export default fetchCategoriesReducer