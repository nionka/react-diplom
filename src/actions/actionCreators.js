import { CHANGE_CATEGORY,
  CHANGE_CHECKBOX,
  CHANGE_ORDER_FIELD, 
  CHANGE_SEARCH_FIELD, 
  CHANGE_SEARCH_HIDE, 
  CHECK_ENTER, 
  CHOOSE_SIZE, 
  FETCH_CATALOG_FAILURE, 
  FETCH_CATALOG_START, 
  FETCH_CATALOG_SUCCESS, 
  FETCH_CATEGORIES_FAILURE, 
  FETCH_CATEGORIES_START, 
  FETCH_CATEGORIES_SUCCESS, 
  FETCH_MORE_FAILURE, 
  FETCH_MORE_HIDE, 
  FETCH_MORE_START, 
  FETCH_MORE_SUCCESS, 
  FETCH_ORDER_FAILURE, 
  FETCH_ORDER_START, 
  FETCH_ORDER_SUCCESS, 
  FETCH_PRODUCT_FAILURE, 
  FETCH_PRODUCT_START, 
  FETCH_PRODUCT_SUCCESS, 
  FETCH_TOP_FAILURE, 
  FETCH_TOP_START, 
  FETCH_TOP_SUCCESS, 
  NUMBER_DEC, 
  NUMBER_INC, 
  UPDATE_CART } from "./actionTypes";

export const fetchTopStart = () => ({
  type: FETCH_TOP_START,
});

export const fetchTopFailure = (error) => ({
  type: FETCH_TOP_FAILURE,
  payload: { error },
});

export const fetchTopSuccess = (items) => ({
  type: FETCH_TOP_SUCCESS,
  payload: { items },
});

export const fetchCategoriesStart = () => ({
  type: FETCH_CATEGORIES_START,
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error },
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories },
});

export const changeCategory = (category) => ({
  type: CHANGE_CATEGORY,
  payload: { category },
});

export const fetchCatalogStart = () => ({
  type: FETCH_CATALOG_START,
});

export const fetchCatalogFailure = (error) => ({
  type: FETCH_CATALOG_FAILURE,
  payload: { error },
});

export const fetchCatalogSuccess = (items) => ({
  type: FETCH_CATALOG_SUCCESS,
  payload: { items },
});

export const fetchMoreStart = () => ({
  type: FETCH_MORE_START,
});

export const fetchMoreFailure = (error) => ({
  type: FETCH_MORE_FAILURE,
  payload: { error },
});

export const fetchMoreHide = (itemMore) => ({
  type: FETCH_MORE_HIDE,
  payload: { itemMore },
});

export const fetchMoreSuccess = (itemsMore) => ({
  type: FETCH_MORE_SUCCESS,
  payload: { itemsMore },
});

export const changeSearchField = (search) => ({
  type: CHANGE_SEARCH_FIELD,
  payload: { search },
});

export const changeSearchHide = (hide) => ({
  type: CHANGE_SEARCH_HIDE,
  payload: { hide },
});

export const checkEnter = () => ({
  type: CHECK_ENTER,
});

export const fetchProductStart = () => ({
  type: FETCH_PRODUCT_START,
});

export const fetchProductFailure = (error) => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: { error },
});

export const fetchProductSuccess = (item) => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: { item },
});

export const chooseSize = (size) => ({
  type: CHOOSE_SIZE,
  payload: { size },
});

export const numberInc = () => ({
  type: NUMBER_INC,
});

export const numberDec = () => ({
  type: NUMBER_DEC,
});

export const updateCart = () => ({
  type: UPDATE_CART,
});

export const changeOrderField = (name, value) => ({
  type: CHANGE_ORDER_FIELD,
  payload: { name, value },
});

export const changeCheckbox = (checked) => ({
  type: CHANGE_CHECKBOX,
  payload: { checked },
});

export const fetchOrderStart = () => ({
  type: FETCH_ORDER_START,
});

export const fetchOrderFailure = (error) => ({
  type: FETCH_ORDER_FAILURE,
  payload: { error },
});

export const fetchOrderSuccess = () => ({
  type: FETCH_ORDER_SUCCESS,
});



export const sendOrder = (owner, products) => async (dispatch) => {
  dispatch(fetchOrderStart());

  const items = [...products.map(prod => {
    const { id, price, number } = prod;
    return { id, price, count: number };
  })];

  const body = { owner, items };
  
  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    localStorage.clear();
    dispatch(updateCart());
    dispatch(fetchOrderSuccess());

  } catch (error) {
    dispatch(fetchOrderFailure(error.message));
  } 
}

export const addProductInCart = (product) => async (dispatch) => {
  let be = false;

  if (localStorage.length === 0) {
    localStorage.setItem('cart', JSON.stringify([product]));
  } else {
    const cart = await JSON.parse(localStorage.getItem('cart'));
    
    cart.forEach(elem => {
      if (elem.id === product.id && elem.size === product.size) {
        elem.number += product.number;
        be = true;
      }
    })

    !be && cart.push(product);

    localStorage.setItem('cart', JSON.stringify(cart));  
  }

  dispatch(updateCart())
}

export const deleteInCart = (id) => (dispatch) => {
  const cart = JSON.parse(localStorage.getItem('cart')).filter(prod => prod.id !== id);

  localStorage.setItem('cart', JSON.stringify(cart));

  dispatch(updateCart());
}

export const fetchProduct = (id) => async(dispatch) => {
  dispatch(fetchProductStart());

  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/items/${id}`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();

    dispatch(fetchProductSuccess(json));

  } catch (error) {
    dispatch(fetchProductFailure(error.message));
  }
}

export const fetchCatalog = (id, search) => async (dispatch) => {
  dispatch(fetchCatalogStart());

  const url = new URL(`${process.env.REACT_APP_URL}/items`);
  id !== 0 && url.searchParams.append('categoryId', id);
  search.trim() !== '' && url.searchParams.append('q', search);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();

    dispatch(fetchCatalogSuccess(json));

  } catch (error) {
    dispatch(fetchCatalogFailure(error.message));
  }
}

export const fetchMore = (offset, id, search) => async (dispatch) => {
  dispatch(fetchMoreStart());

  const url = new URL(`${process.env.REACT_APP_URL}/items`);
  id !== 0 && url.searchParams.append('categoryId', id);
  search.trim() !== '' && url.searchParams.append('q', search);
  url.searchParams.append('offset', offset);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();

    if (json.length < 6) {
      dispatch(fetchMoreHide(json));
    } else {
      dispatch(fetchMoreSuccess(json));
    }

  } catch (error) {
    dispatch(fetchMoreFailure(error.message));
  }
}

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/categories`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();

    dispatch(fetchCategoriesSuccess(json));

  } catch (error) {
    dispatch(fetchCategoriesFailure(error.message))
  }
}

export const fetchTop = () => async (dispatch) => {
  dispatch(fetchTopStart());

  try {
    const response = await fetch(`${process.env.REACT_APP_URL}/top-sales`);

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();

    dispatch(fetchTopSuccess(json));

  } catch (error) {
    dispatch(fetchTopFailure(error.message));
  }
}