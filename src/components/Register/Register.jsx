//libraries
import { useState } from 'react'
import { useHistory } from 'react-router-dom'

//components
import MenuRegister from '../Menu/Register/MenuRegister'
import RestaurantRegister from './Restaurant/RestaurantRegister'
import UserRegister from './User/UserRegister'
import './register.scss'
import NavBar from '../Common/NavBar/NavBar'
import Card from '../Common/Cards/Card'
//fetch methods


const Register = () => {

  const [steps] = useState([
    { value: 1, title: 'create your account', form: 'userRegister' },
    { value: 2, title: 'register your restaurant', form: 'restaurantRegister' },
    { value: 3, title: 'create your first dish', form:'dishRegister'}
  ])
  const history = useHistory()

  const restaurant = {isMain:true}

  const [accountInfo, setAccountInfo] = useState({})

  const [step, setStep] = useState(0)

  const handleNext = () => {
    if (step !== 2) setStep(step + 1)
    if (step ===2) history.push('/')
  }

  const handlePrev = () => {
    if (step !== 0) setStep(step - 1)
  }

  if (step === undefined) return <p>Loading</p>
  return (
    <div className='register'>
      <NavBar />
      <div className="register__container">
        {/* Step Number */}
        <div className="register__steps">
          {
            steps.map((stepSelect, id) => {
              return <div key={id} className={`register__steps__step ${id === step ? '--current' : ''}`}>{stepSelect.value}</div>
            })
          }
        </div>
        {/* Step component */}
        <div className="register__content">
          <Card title={`Let's ${steps[step].title}`}>
            {step === 0 && <UserRegister nextElement={handleNext} setAccountInfo={setAccountInfo}/>}
            {step === 1 && <RestaurantRegister nextElement={handleNext} accountInfo={accountInfo} restaurant={restaurant} setAccountInfo={setAccountInfo}/>}
            {step === 2 && <MenuRegister registerType nextElement={handleNext} branch={accountInfo.branch}/>}
          </Card>
        </div>
        {/* Submit Button */}
        <div className="register__buttons">
        {step > 0 ?
          <button className="--prev hvr-i-left" onClick={e => handlePrev(e)}>
            <i className="material-icons hvr-i">arrow_back</i>
            Back
          </button>
          : null
        }
        
          <button type='submit'  className="hvr-i-right" form={steps[step].form}>
          
            {step !== 2 ? 'Next' : 'Finish'}
            <i className="material-icons hvr-i">arrow_forward</i>
            
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default Register
