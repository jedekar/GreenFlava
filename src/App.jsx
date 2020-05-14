import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/SignIn'
import Nav from './pages/Nav';
import SignUp from './pages/SignUp';
import UserOrders from './pages/UserOrders';
import HomePage from './pages/HomePage';

export default function App() {
  return (
    <Router>
      <div className="App">
        
        <Nav />
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/about" exact component={About} />
          <Route path="/login" exact component={SignIn} />
          <Route path="/sign-up" exact component={SignUp} />
          <Route path="/user-orders" exact component={UserOrders} />
        </Switch>
      </div>
    </Router>
  );
}
