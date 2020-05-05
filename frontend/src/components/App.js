import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './Header';
import Login from './auth/Login';
import Register from './auth/Register';

class App extends Component {
  render() {
    return (
      <div className="container">
        <BrowserRouter>
          <Header />
          <div className="row">
            <Route exact path="/" component={null} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
