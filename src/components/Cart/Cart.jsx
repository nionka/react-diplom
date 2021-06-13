import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteInCart } from '../../actions/actionCreators';
import Order from '../Order/Order';

function Cart() {
  const { products } = useSelector(state => state.productsInCart);
  const { success } = useSelector(state => state.orderFetch);
  const dispatch = useDispatch();

  return (
    <>
      <section className="cart">
        <h2 className="text-center">Корзина</h2>
        <table className="table table-bordered">
          <thead>
              <tr>
                  <th scope="col">#</th>
                  <th scope="col">Название</th>
                  <th scope="col">Размер</th>
                  <th scope="col">Кол-во</th>
                  <th scope="col">Стоимость</th>
                  <th scope="col">Итого</th>
                  <th scope="col">Действия</th>
              </tr>
          </thead>
          <tbody>
            {products.length !== 0 && products.map((prod, index) =>  
              <tr key={prod.id}>
                <th scope="row">{index + 1}</th>
                <td><Link to={`/catalog/${prod.id}`}>{prod.title}</Link></td>
                <td>{prod.size}</td>
                <td>{prod.number}</td>
                <td>{`${prod.price} руб.`}</td>
                <td>{`${prod.price * prod.number} руб.`}</td>
                <td><button className="btn btn-outline-danger btn-sm" onClick={() => dispatch(deleteInCart(prod.id))}>Удалить</button></td>
              </tr>
            )}
              <tr>
                  <td colSpan="5" className="text-right">Общая стоимость</td>
                  <td>{`${products.reduce((acc, cur) => acc + cur.number * cur.price, 0)} руб.`}</td>
              </tr>
          </tbody>
        </table>
    </section>
    {products.length !== 0 && <Order /> }
    {success && <div style={{textAlign: "center", marginBottom: "20px"}}>Заказ отправлен!!!</div>}
  </>
  )
}

export default Cart