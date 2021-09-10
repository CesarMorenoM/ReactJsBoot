import { useContext } from 'react'
import UserContext from '../../context/UserContext/UserContext'
import Card from '../Common/Cards/Card'
import RestaurantRegister from '../Register/Restaurant/RestaurantRegister'
import UserRegister from '../Register/User/UserRegister'
import './configuration.scss'

const Configuration = () => {
  const { user, branches: branchesInfo } = useContext(UserContext)

  const branches = [...branchesInfo]
  branches.shift()

  return (
    <div className='configuration'>
      <Card title='User configuration'>
        <div className='configuration__user'>
          <UserRegister user={user} />
        </div>
      </Card>
      <Card title={`Restaurant's configuration`}>
        <div className='configuration__restaurant'>
          {
            branches.map(branch => (
              <details key={branch.id} className='restaurant' open>
                <summary>
                  {branch.name}
                </summary>
                <RestaurantRegister restaurant={branch} />
              </details>
            ))
          }
        </div>
      </Card>
    </div>
  )
}

export default Configuration
