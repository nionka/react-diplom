import { useDispatch, useSelector } from "react-redux"
import { changeSearchField, checkEnter } from "../../actions/actionCreators";

function Search() {
  const { search } = useSelector(state => state.searchFetch);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeSearchField(e.target.value))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(checkEnter());
  }

  return (
    <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
      <input 
        value={search} 
        name="search" 
        onChange={handleChange} 
        className="form-control" 
        placeholder="Поиск" 
        />
    </form>
  )
}

export default Search