import PropTypes from 'prop-types'
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

BranchesList.propTypes = {
  /**The current branches */
  branches: PropTypes.array.isRequired,
  /**The current branch */
  currentBranch: PropTypes.object.isRequired,
  /**A function to change the current branch */
  setBranch: PropTypes.func.isRequired
}

export default BranchesList
