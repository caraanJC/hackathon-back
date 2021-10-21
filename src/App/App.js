import 'assets/sass/app.scss';
import { Route, Switch } from 'react-router-dom';
import About from './About';
import Cart from './Cart';
import Home from './Home';
import Login from './Login';
import Shop from './Shop';
import Signup from './Signup';

function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/shop" component={Shop} />
        <Route path="/cart" component={Cart} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

export default App;
