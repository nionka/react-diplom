import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTop } from "../../actions/actionCreators";
import Card from "../Card/Card";
import Error from "../Error/Error";
import Preloader from '../Preloader/Preloader';

function TopSales() {
  const { items, loading, error } = useSelector(state => state.topFetch);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTop());
  }, [dispatch]);

  if (items.length === 0 && !loading) return null

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
        <div className="row">
          {loading && <Preloader />}
          {error && <Error />}
          {items.length !== 0 && items.map((item) => <Card key={item.id} item={item} />)}
        </div>
    </section>
  )
}

export default TopSales