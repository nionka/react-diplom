import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './components/Header/Header';
import MainPage from './components/MainPage/MainPage';
import Catalog from './components/Catalog/Catalog';
import About from './components/About/About';
import Contacts from './components/Contacts/Contacts';
import Footer from './components/Footer/Footer';
import Page404 from './components/404/Page404';
import Cart from './components/Cart/Cart';
import ParentElem from './components/ParentElem/ParentElem';
import NavInfo from './components/Footer/NavInfo';
import Pay from './components/Footer/Pay';
import ContactsFooter from './components/Footer/ContactsFooter';
import NavBar from './components/Header/NavBar';
import Search from './components/Search/Search';
import Product from './components/Product/Product';


function App() {
  return (
    <Router basename="/">
      <Header>
        <NavBar />
      </Header>
      <ParentElem>
        <Switch>
          <Route path="/contacts" component={Contacts} />
          <Route path="/about" component={About} />
          <Route path="/catalog/:id" component={Product} />
          <Route path="/catalog">
            <Catalog>
              <Search />
            </Catalog>
          </Route>
          <Route path="/cart" component={Cart} />
          <Route path="/" exact component={MainPage} />
          <Route path="*" component={Page404} />
        </Switch>
      </ParentElem>
      <Footer>
        <NavInfo />
        <Pay />
        <ContactsFooter />
      </Footer>
    </Router>
  );
}

export default App;
