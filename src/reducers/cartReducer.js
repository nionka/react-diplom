import { UPDATE_CART } from "../actions/actionTypes"

const extractCart = () => localStorage.cart ? JSON.parse(localStorage.getItem('cart')) : [];

const initialState = {
  products: extractCart()
}

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_CART:
      return { ...state, products:  extractCart() }
    default:
      return state
  }

}

export default cartReducer