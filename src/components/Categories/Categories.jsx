/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { changeCategory, fetchCategories } from "../../actions/actionCreators";

function Categories() {
  const { categories, change } = useSelector(state => state.categoriesFetch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const handleClick = (e, id) => {
    e.preventDefault();
    dispatch(changeCategory(id));
  }

  return (
    <ul className="catalog-categories nav justify-content-center">
      {categories.map((ctg) => 
        <li key={ctg.id} className="nav-item">
          <a className={ctg.id === change ? "nav-link active" : "nav-link"}
            onClick={(e) => handleClick(e, ctg.id)} href="/">{ctg.title}
          </a>
        </li>
      )}
    </ul>
  )
}

export default Categories