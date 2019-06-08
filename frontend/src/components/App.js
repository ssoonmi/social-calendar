import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
// import logo from '../logo.svg';
import './App.css';
import MainPage from './main/MainPage';
import NavBar from './nav/NavBar';
import LoginForm from './session/LoginForm';
import SignupForm from './session/SignupForm';
import CalendarEditForm from './calendars/CalendarEditForm';
import CalendarCreateForm from './calendars/CalendarCreateForm';

function App() {
  return (
    <>
      <NavBar />
      <main>
        <Switch>
          <AuthRoute exact path="/login" component={LoginForm} />
          <AuthRoute exact path="/signup" component={SignupForm} />
          <ProtectedRoute path="/calendars/new" component={CalendarCreateForm} />
          <ProtectedRoute path="/calendars/:calendarId/edit" component={CalendarEditForm} />
          <Route path="/" component={MainPage} />
        </Switch>
      </main>
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
