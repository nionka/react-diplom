import { useDispatch, useSelector } from "react-redux"
import { fetchMore } from "../../actions/actionCreators";
import Preloader from "../Preloader/Preloader";

function BtnMore() {
  const { items, hide, disabled, loadingBtn } = useSelector(state => state.catalogFetch);
  const { change } = useSelector(state => state.categoriesFetch);
  const { search } = useSelector(state => state.searchFetch);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(fetchMore(items.length, change, search));
  }

  return (
    <>
    {loadingBtn && <Preloader />}
    <div className="text-center">
      <button className={`btn btn-outline-primary ${hide && 'invisible'}`} onClick={handleClick} disabled={disabled}>Загрузить ещё</button>
    </div>
    </>
  )
}

export default BtnMore