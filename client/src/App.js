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
import CreateSupplementation from './routes/client/CreateSupplementation';
import Diet from './routes/client/Diet';
import CreateDiet from './routes/client/CreateDiet';

import Users from './routes/admin/Users';
import Diets from './routes/admin/Diets';
import EditDiet from './routes/admin/EditDiet';
import Recipes from './routes/admin/Recipes';
import Products from './routes/admin/Products';

import Navbar from './components/Navbar';

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
            <Navbar />
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/rejestracja' exact component={Register} />
              <Route path='/logowanie' exact component={Login} />
              <Switch>
                <PrivateRoute path='/panel' exact component={Panel} />
                <PrivateRoute path='/suplementacja' exact component={Supplementation} />
                <PrivateRoute path='/przepisy' exact component={RecipeList} />
                <PrivateRoute path='/dieta' exact component={Diet} />
                <PrivateRoute path='/dieta/stworz' exact component={CreateDiet} />
                <PrivateRoute path='/suplementacja' exact component={Supplementation} />
                <PrivateRoute path='/suplementacja/stworz' exact component={CreateSupplementation} />
                <PrivateRoute path='/admin/uzytkownicy' exact component={Users} />
                <PrivateRoute path='/admin/diety/:id' exact component={EditDiet} />
                <PrivateRoute path='/admin/diety' exact component={Diets} />
                <PrivateRoute path='/admin/przepisy' exact component={Recipes} />
                <PrivateRoute path='/admin/produkty' exact component={Products} />
                <Route path='/404' exact component={NotFound} />
                <Redirect to="/404" />
              </Switch>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
