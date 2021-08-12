import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style/normalize.scss'
import './style/Global.scss';
import './style/_animations.scss'
import Dashboard from './components/Dashboard/Dashboard'
import NavBar from './components/Common/NavBar/NavBar';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Footer from './components/Footer/Footer'
import { UserContextProvider } from './context/UserContext/UserContext';

function App() {
  return (
    <UserContextProvider>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='*' component={ErrorPage} />
        </Switch>
      </Router>
      <Footer />
    </UserContextProvider>
  )
}

export default App;
