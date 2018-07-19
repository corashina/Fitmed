import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import Landing from './routes/Landing';
import Panel from './routes/Panel';
import Register from './routes/Register';
import Login from './routes/Login';
import Users from './routes/Users';
import Products from './routes/Products';
import Recipes from './routes/Recipes';
import NotFound from './routes/NotFound';
import Admin from './routes/Admin';

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
              <Route path='/panel' exact component={Panel} />
              <Route path='/admin/panel' exact component={Admin} />
              <Route path='/admin/uzytkownicy' exact component={Users} />
              <Route path='/admin/produkty' exact component={Products} />
              <Route path='/admin/przepisy' exact component={Recipes} />
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
