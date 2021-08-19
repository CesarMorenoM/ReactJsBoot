import { useContext, useState } from 'react'
import UserContext from '../../context/UserContext/UserContext'
import './Branches.scss'
import contactImage from '../../static/contact-restaurant.jpg'
import Menu from '../Menu/Menu'
import Card from '../Common/Cards/Card'
import BranchesList from '../Common/BranchesList/BranchesList'

const Branches = () => {
  const { branches: branchesInfo } = useContext(UserContext)
  const branches = [...branchesInfo]
  branches.shift()
  const [currentBranch, setCurrentBranch] = useState(branches[0])
  const changeBranch = branch => {
    console.log(branch)
    setCurrentBranch(branch)
  }

  return (
    <>
      <div className='branches__list'>
        <BranchesList branches={branches} currentBranch={currentBranch} setBranch={changeBranch} />
      </div>
      <div className='branches__content'>
        <div className='branches__content__info'>
          <Card title='Branch'>
            <div className='branches__content__info__img'>
              <img src={currentBranch.image || contactImage} alt={currentBranch.name} />
            </div>
            <h2 className='branches__content__info__name'>{currentBranch.name}</h2>
            <p className='branches__content__info__info'>{currentBranch.address}</p>
            <p className='branches__content__info__info'>{currentBranch.phone}</p>
            <button className='branches__content__info__settings'>Settings</button>
          </Card>
        </div>
        <Menu branch={currentBranch} franch={false} />
      </div>
    </>
  )
}

export default Branches
