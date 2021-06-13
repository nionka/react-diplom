import { useDispatch, useSelector } from "react-redux"
import { changeSearchField } from "../../actions/actionCreators";

function Search() {
  const { search, hide } = useSelector(state => state.searchFetch);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    dispatch(changeSearchField(e.target.value));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <form data-id="search-form"
     className={`header-controls-search-form form-inline ${hide && 'invisible'}`}
     onSubmit={handleSubmit}
     >
      <input 
        name="search" 
        value={search} 
        onChange={handleChange} 
        className="form-control" 
        placeholder="Поиск" 
        />
    </form>
  )
}

export default Search