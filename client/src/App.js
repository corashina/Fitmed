import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import PrivateRoute from './components/PrivateRoute';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions'

import Landing from './routes/Landing';
import Register from './routes/Register';
import Login from './routes/Login';
import NotFound from './routes/NotFound';

import Panel from './routes/client/Panel';
import RecipeList from './routes/client/RecipeList';
import Supplementation from './routes/client/Supplementation';
import Training from './routes/client/Training';

import Users from './routes/admin/Users';
import Products from './routes/admin/Products';
import Recipes from './routes/admin/Recipes';
import Admin from './routes/admin/Admin';

if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
  const decoded = jwt_decode(localStorage.jwt);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = '/logowanie';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/rejestracja' exact component={Register} />
              <Route path='/logowanie' exact component={Login} />
              <Route path='/panel' exact component={Panel} />
              <Route path='/suplementacja' exact component={Supplementation} />
              <Route path='/przepisy' exact component={RecipeList} />
              <Route path='/admin/panel' exact component={Admin} />
              <Route path='/admin/uzytkownicy' exact component={Users} />
              <Route path='/admin/produkty' exact component={Products} />
              <Route path='/admin/przepisy' exact component={Recipes} />
              <Switch>
                <PrivateRoute path='/trening' exact component={Training} />
              </Switch>
              <Route path='/404' exact component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
