import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'  
import Navbar from './layout/Navbar'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Home from './pages/Home';
import Day from './pages/Day';

function Router() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="px-5">
        <Switch>
          <Route exact path="/">
            <Day />
          </Route>
          <Route path="/register">
            <Register/>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/customer">
            <div>
              customer
            </div>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default Router
