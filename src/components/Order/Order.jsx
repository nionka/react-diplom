import { useDispatch, useSelector } from "react-redux";
import { changeOrderField, changeCheckbox, sendOrder } from '../../actions/actionCreators';
import Error from "../Error/Error";
import Preloader from "../Preloader/Preloader";

function Order() {
  const { owner, checked, loading, error } = useSelector(state => state.orderFetch);
	const { products } = useSelector(state => state.productsInCart);
	const dispatch = useDispatch();

	const onDisable = () => {
		if (owner.phone.trim() !== '' && Number(owner.phone) && owner.address.trim() !== '' && checked) {
			return false
		} else {
			return true
		}
	}	

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(sendOrder(owner, products));
	}

	const handleChange = (e) => {
		const { name, value } = e.target;
		dispatch(changeOrderField(name, value))
	}

	const handleChecked = (e) => {
		dispatch(changeCheckbox(!checked));
	}

	if (loading) return <Preloader />

  return (
    <section className="order">
			<h2 className="text-center">Оформить заказ</h2>
			<div className="card" style={{maxWidth: '30rem', margin: '0 auto'}}>
					<form className="card-body" onSubmit={handleSubmit}>
							<div className="form-group">
									<label htmlFor="phone">Телефон</label>
									<input
										className="form-control" 
										id="phone" 
										placeholder="Ваш телефон" 
										name="phone" 
										value={owner.phone}
										onChange={handleChange}
										/>
							</div>
							<div className="form-group">
									<label htmlFor="address">Адрес доставки</label>
									<input 
										className="form-control" 
										id="address" 
										placeholder="Адрес доставки" 
										name="address"
										value={owner.address}
										onChange={handleChange}
										/>
							</div>
							<div className="form-group form-check">
									<input 
										type="checkbox" 
										className="form-check-input" 
										id="agreement" 
										checked={checked}
										onChange={handleChecked}
										/>
									<label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
							</div>
							<button type="submit" className="btn btn-outline-secondary" disabled={onDisable()}>Оформить</button>
					</form>
			</div>
			{error && <Error />}
		</section>
  )
}

export default Order