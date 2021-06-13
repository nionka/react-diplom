import { NavLink } from "react-router-dom";
import Logo from './Logo';
import Search from './Search';
import Widget from "./Widget";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light">
      <Logo />
      <div className="collapase navbar-collapse" id="navbarMain">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact to="/" className="nav-link" activeClassName="active">Главная</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/catalog" className="nav-link" activeClassName="active">Каталог</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" activeClassName="active">О магазине</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/contacts" className="nav-link" activeClassName="active">Контакты</NavLink>
          </li>
        </ul>
        <div>
          <Widget />
          <Search />
        </div>
      </div>
    </nav>
  )
}

export default NavBar