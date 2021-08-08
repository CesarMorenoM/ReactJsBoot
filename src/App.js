import React from 'react'
import './style/Global.scss';
import './style/_animations.scss'
import Dashboard from './components/Dashboard/Dashboard'
import Menu from './components/NavBar/NavBar';

// These are provitional for the example
//TODO create this components

function App() {
  return (
    <>
      <Menu user={{}} />
      <Dashboard />
    </>
  )
}

export default App;
