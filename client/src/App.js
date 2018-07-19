import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './routes/Landing';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Users from './routes/Users';
import Products from './routes/Products';
import Recipes from './routes/Recipes';
import NotFound from './routes/NotFound';

class App extends Component {
  render() {
    return (
      (<BrowserRouter>
        <Provider store={store}>
          <div>
            <Switch>
              <Route path='/' exact component={Landing} />
              <Route path='/rejestracja' exact component={Register} />
              <Route path='/logowanie' exact component={Login} />
              <Route path='/panel' exact component={Home} />
              <Route path='/uzytkownicy' exact component={Users} />
              <Route path='/produkty' exact component={Products} />
              <Route path='/przepisy' exact component={Recipes} />
              <Route path='/404' exact component={NotFound} />
              <Redirect to="/404" />
            </Switch>
          </div>
        </Provider>
      </BrowserRouter>)
    );
  }
}

export default App;
