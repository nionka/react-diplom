/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import { fetchProduct, numberDec, numberInc, chooseSize, addProductInCart } from "../../actions/actionCreators";
import Error from "../Error/Error";
import Preloader from "../Preloader/Preloader";
import errorPic from '../../img/errorPic.jpg';

function Product({ match }) {
  const { item, loading, error, checkSize, number } = useSelector(state => state.productFetch);
  const dispatch = useDispatch();
  const history = useHistory();
  let avalible = null;

  if (item.sizes) {
    avalible = item.sizes.filter(size => size.avalible).map(o => o.size);
  }

  useEffect(() => {
    dispatch(fetchProduct(match.params.id));
  }, []);

  if (loading) return <Preloader />

  if (error) return <Error />

  const onError = (e) => {
    e.target.src = errorPic;
  }

  const handleInc = () => {
    if (number < 10) {
      dispatch(numberInc());
    }
  }

  const handleDec = () => {
    if (number !== 1) {
      dispatch(numberDec());
    }
  }

  const handleSize = (size) => {
    if (checkSize !== size) {
      dispatch(chooseSize(size));
    }
  }

  const addInCart = () => {
    const product = {
      id: item.id,
      title: item.title,
      size: checkSize,
      number: number,
      price: item.price,
    }
    
    dispatch(addProductInCart(product));
    history.push("/cart");
  }

  return (
    <section className="catalog-item">
      <h2 className="text-center">{item.title}</h2>
      <div className="row">
        <div className="col-5">
            <img src={item.images && item.images[0]}
                className="img-fluid" alt={item.title} onError={onError} />
        </div>
        <div className="col-7">
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>Артикул</td>
                        <td>{item.sku}</td>
                    </tr>
                    <tr>
                        <td>Производитель</td>
                        <td>{item.manufacturer}</td>
                    </tr>
                    <tr>
                        <td>Цвет</td>
                        <td>{item.color}</td>
                    </tr>
                    <tr>
                        <td>Материалы</td>
                        <td>{item.material}</td>
                    </tr>
                    <tr>
                        <td>Сезон</td>
                        <td>{item.season}</td>
                    </tr>
                    <tr>
                        <td>Повод</td>
                        <td>{item.reason}</td>
                    </tr>
                </tbody>
            </table>
            {avalible && <div className="text-center">
                <p>Размеры в наличии:
                    {avalible.map(size => <span key={item.id}
                        style={{cursor: 'pointer'}}
                        className={`catalog-item-size ${checkSize === size && 'selected'}`}
                        onClick={() => handleSize(size)}
                        >{size}</span>)
                    }
                </p>
                <p>Количество: <span className="btn-group btn-group-sm pl-2">
                        <button className="btn btn-secondary" onClick={handleDec}>-</button>
                        <span className="btn btn-outline-primary">{number}</span>
                        <button className="btn btn-secondary" onClick={handleInc}>+</button>
                    </span>
                </p>
              </div>
            }
            {checkSize !== '' && <button className="btn btn-danger btn-block btn-lg" onClick={addInCart}>В корзину</button>}
        </div>
      </div>
  </section>
  )
}

export default Product