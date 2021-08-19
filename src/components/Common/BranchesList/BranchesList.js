import './branchesList.scss'

const BranchesList = ({ branches, currentBranch, setBranch }) => {
  return (
    <ul className='branchesList'>
      {branches.map(branch => (
        <button
          key={branch.id}
          className={`branchesList__branch hvr-bg-fade ${currentBranch === branch ? '--selected' : ''}`}
          onClick={() => { setBranch(branch) }}
        >
          <i className="material-icons">home</i>
          <span>{branch.name}</span>
        </button>))}
    </ul>
  )
}

export default BranchesList
