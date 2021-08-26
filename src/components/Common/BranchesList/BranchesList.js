import './branchesList.scss'

const BranchesList = ({ branches, currentBranch, setBranch }) => {
  return (
    <ul className='branchesList'>
      {branches.map(branch => (
        <button
          key={branch.id}
          className={`branchesList__branch ${currentBranch === branch ? '--selected' : ''}`}
          onClick={() => setBranch(branch)}
        >
          <i className="material-icons">home</i>
          <span>{branch.name}</span>
        </button>))}
      <button className='branchesList__add' ><i className="material-icons">add</i></button>
    </ul>
  )
}

export default BranchesList
