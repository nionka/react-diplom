import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router"
import { changeSearchHide } from "../../actions/actionCreators";

function Widget() {
  const history = useHistory();
  const { search, hide } = useSelector(state => state.searchFetch);
  const { products } = useSelector(state => state.productsInCart);
  const dispatch = useDispatch();

  const handleHide = (e) => {
    if (hide) {
      dispatch(changeSearchHide(!hide));
    }

    if (!hide && search.trim() === '') {
      dispatch(changeSearchHide(!hide));
    }

    if (!hide && search.trim() !== '') {
      dispatch(changeSearchHide(!hide));
      history.push("/catalog")
    }  
  }
  
  return (
    <div className="header-controls-pics">
      <div data-id="search-expander" className="header-controls-pic header-controls-search"  onClick={handleHide} ></div>
      <div className="header-controls-pic header-controls-cart" onClick={() => history.push("/cart")}>
        {products.length !== 0 && <div className="header-controls-cart-full">{products.length}</div>}
        <div className="header-controls-cart-menu"></div>
      </div>
    </div>
  )
}

export default Widget