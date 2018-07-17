import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';
import Login from './routes/Login';

class App extends Component {
  render() {
    return (
      (<BrowserRouter>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
        </div>
      </BrowserRouter>)
    );
  }
}

export default App;
