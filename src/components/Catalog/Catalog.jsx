/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCatalog } from '../../actions/actionCreators';
import BtnMore from '../BtnMore/BtnMore';
import Card from '../Card/Card';
import Categories from '../Categories/Categories';
import Error from '../Error/Error';
import Preloader from '../Preloader/Preloader';
import './catalog.css';

function Catalog({ children }) {
  const { items, loading, error } = useSelector(state => state.catalogFetch);
  const { change } = useSelector(state => state.categoriesFetch);
  const { search, enter } = useSelector(state => state.searchFetch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCatalog(change, search));
  }, [dispatch, change, enter]);

  const hand = () => {
    if (children) {
      return (
        <>
          {children}
          <Categories />
          {loading && <Preloader />}
        </>
      )
    } else {
      return (
        <>
          {loading ? <Preloader /> : <Categories />}
        </>
      )
    }
  }

  return (
    <section className="catalog">
      <h2 className="text-center">Каталог</h2>
      { hand() }
      {error && <Error />}
      {!loading && !error &&
        <>
        <div className="row">
          {items.map(item => <Card key={item.id} item={item} />)}
        </div>
        {items.length === 0 && <div style={{textAlign: "center"}}>По вашему запросу ничего не найдено</div>}
        {items.length >= 6 && <BtnMore />}
        </>
      }  
    </section>   
  )
}

export default Catalog