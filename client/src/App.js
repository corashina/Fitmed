import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './routes/Landing';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';
import Users from './routes/Users';
import Products from './routes/Products';

class App extends Component {
  render() {
    return (
      (<BrowserRouter>
        <div>
          <Route path='/' exact component={Landing} />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <Route path='/home' exact component={Home} />
          <Route path='/users' exact component={Users} />
          <Route path='/products' exact component={Products} />
        </div>
      </BrowserRouter>)
    );
  }
}

export default App;
