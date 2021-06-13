import { Link } from "react-router-dom";
import errorPic from '../../img/errorPic.jpg';

function Card({ item }) {

  const onError = (e) => {
    e.target.src = errorPic;
  }

  return (
    <div className="col-4">
      <div className="card catalog-item-card">
          <img src={item.images[0]} style={{height: '250px', objectFit: 'contain'}}
              className="card-img-top img-fluid" alt={item.title} onError={onError} />
          <div className="card-body">
              <p className="card-text">{item.title}</p>
              <p className="card-text">{`${item.price} руб`}</p>
              <Link to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</Link>
          </div>
      </div>
    </div>
  )
}

export default Card