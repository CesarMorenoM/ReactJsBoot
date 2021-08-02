import React from 'react'

const Branches = ({ branches, branch, setBranch }) => {
  return (
    <ul className='dashboard__branches'>
      {branches.map(branch => (
        <button
          className='dashboard__branches__branch hvr-grow'
          onClick={() => { setBranch(branch) }}
        >
          <i class="material-icons">home</i>
          <span>{branch}</span>
        </button>))}
    </ul>
  )
}

export default Branches
