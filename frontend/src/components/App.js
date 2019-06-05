import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
// import logo from '../logo.svg';
import './App.css';
import MainPage from './main/MainPage';
import NavBar from './nav/NavBar';
import LoginForm from './session/LoginForm';
import SignupForm from './session/SignupForm';

function App() {
  return (
    <>
      <NavBar />
      <Switch>
        <AuthRoute exact path="/login" component={LoginForm} />
        <AuthRoute exact path="/signup" component={SignupForm} />
        <Route path="/" component={MainPage} />
      </Switch>
    </>
  );
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>
  //         Edit <code>src/App.js</code> and save to reload.
  //       </p>
  //       <a
  //         className="App-link"
  //         href="https://reactjs.org"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //       >
  //         Learn React
  //       </a>
  //     </header>
  //   </div>
  // );
}

export default App;
