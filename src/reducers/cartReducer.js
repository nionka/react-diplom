import { UPDATE_CART } from "../actions/actionTypes"

const initialState = {
  products: localStorage.length !== 0 ? JSON.parse(localStorage.getItem('cart')) : []
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return { ...state, products:  localStorage.length !== 0 ? JSON.parse(localStorage.getItem('cart')) : [] }
    default:
      return state
  }

}

export default cartReducer