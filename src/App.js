import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style/normalize.scss'
import './style/Global.scss';
import './style/_animations.scss'
import Dashboard from './components/Dashboard/Dashboard'
//import NavBar from './components/Common/NavBar/NavBar';
import ErrorPage from './components/ErrorPage/ErrorPage';
//import Footer from './components/Footer/Footer'
import PrivateRoute from './router/PrivateRoute'
import { UserContextProvider } from './context/UserContext/UserContext';
import LogIn from './components/LogIn/LogIn';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route exact path='/login' component={LogIn} />
          <PrivateRoute exact path='/' component={Dashboard} />
          <PrivateRoute exact path='/dashboard' component={Dashboard} />
          <PrivateRoute exact path='/profile' component={() => <h1>Hey</h1>} />
          <PrivateRoute exact path='/reservations' component={() => <h1>Hey</h1>} />
          <PrivateRoute exact path='/config' component={() => <h1>Hey</h1>} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Router>
    </UserContextProvider>
  )
}

export default App;
