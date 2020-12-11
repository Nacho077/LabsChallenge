import { Route, Switch } from 'react-router-dom'
import Category from './components/category/category.js'
import Product from './components/product/product.js'
import Search from './components/search/search.js'
import Home from './components/home/home.js'
import Favs from './components/favs/favs.js'
import User from './components/login/user'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/product/:id" component={Product}/>
        <Route path="/category/:id" component={Category}/>
        <Route exact path="/search" component={Search}/>
        <Route exact path="/login" component={User}/>
        <Route exact path="/favs" component={Favs}/>
      </Switch>
    </div>
  );
}

export default App;
