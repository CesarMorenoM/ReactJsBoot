import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Toaster } from 'react-hot-toast'

import './style/normalize.scss'
import './style/Global.scss';
import './style/_animations.scss'

import Dashboard from './components/Dashboard/Dashboard'
import ErrorPage from './components/ErrorPage/ErrorPage';
import PrivateRoute from './router/PrivateRoute'
import LogIn from './components/LogIn/LogIn';

import { UserContextProvider } from './context/UserContext/UserContext';
import LandingPage from './components/LandingPage/LandingPage';
import Branches from './components/Branches/Branches';
import Menu from './components/Menu/Menu';
import { MenuContextProvider } from './context/MenuContext/MenuContext';

function App() {
  return (
    <>
      <Toaster />
      <UserContextProvider>
        <MenuContextProvider>
          <Router>
            <Switch>
              <Route exact path='/home' component={LandingPage} />
              <Route exact path='/login' component={LogIn} />
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/profile' component={() => <h1>Profile</h1>} />
              <PrivateRoute exact path='/reservations' component={() => <h1>Reservations</h1>} />
              <PrivateRoute exact path='/config' component={() => <h1>Configuration</h1>} />
              <PrivateRoute exact path='/branches' component={Branches} />
              <PrivateRoute exact path='/menu' component={Menu} />
              <Route path='*' component={ErrorPage} />
            </Switch>
          </Router>
        </MenuContextProvider>
      </UserContextProvider>
    </>
  )
}

export default App;
