import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';

class App extends Component {
  render() {
    return (
      (<BrowserRouter>
        <div>
          <Route path='/' exact component={Home} />
          <Route path='/register' exact component={Register} />
        </div>
      </BrowserRouter>)
    );
  }
}

export default App;
