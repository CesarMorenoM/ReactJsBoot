import React from 'react'
import './style/Global.scss';
import Dashboard from './components/Dashboard/Dashboard'

// These are provitional for the example
//TODO create this components
function Menu() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: '#E3E3E3' }}>
      <h2>Here my awesome menu</h2>
    </div>
  )
}

function App() {
  return (
    <>
      <Menu />
      <Dashboard />
    </>
  )
}

export default App;
