import { Route, Switch } from 'react-router-dom'
import Category from './components/category/category.js'
import Product from './components/product/product.js'
import Search from './components/search/search.js'
import Home from './components/home/home.js'
import Favs from './components/favs/favs.js'
import User from './components/login/user'
import NavBar from './components/header'
import Footer from './components/footer/footer.js'
import s from './app.module.css'

function App() {
  return (
    <div className="App">
      <div className={s.header}>
        <Route path="/:page" component={NavBar}/>
      </div>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/product/:id" component={Product}/>
        <Route path="/category/:id" component={Category}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/login" component={User}/>
        <Route exact path="/favs" component={Favs}/>
      </Switch>
      <div className={s.footer}>
        <Route path="/" component={Footer}/>
      </div>
    </div>
  );
}

export default App;
