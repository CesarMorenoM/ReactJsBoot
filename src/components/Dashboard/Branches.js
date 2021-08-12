import React from 'react'

const Branches = ({ branches, currentBranch, setBranch }) => {
  return (
    <ul className='dashboard__branches'>
      {branches.map(branch => (
        <button
          key={branch.id}
          className={`dashboard__branches__branch hvr-grow ${currentBranch === branch ? '--selected' : ''}`}
          onClick={() => { setBranch(branch) }}
        >
          <i className="material-icons">home</i>
          <span>{branch.name}</span>
        </button>))}
    </ul>
  )
}

export default Branches
