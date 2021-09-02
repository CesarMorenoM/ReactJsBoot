//libraries
import { useState } from 'react'
//components
import MenuRegister from '../Menu/Register/MenuRegister'
import RestaurantRegister from './Restaurant/RestaurantRegister'
import UserRegister from './User/UserRegister'
import './register.scss'
import NavBar from '../Common/NavBar/NavBar'
import Card from '../Common/Cards/Card'

const Register = () => {

  const [steps] = useState([
    { value: 1, title: 'create your account', form: 'userRegister' },
    { value: 2, title: 'register your restaurant', form: 'dishRegister' },
    { value: 3, title: 'create your first dish' }
  ])

  const [step, setStep] = useState(0)

  const handleNext = () => {
    if (step !== 2) setStep(step + 1)
  }

  const handlePrev = () => {
    if (step !== 0) setStep(step - 1)
  }

  if (step === undefined) return <p>Loading</p>
  return (
    <div className='register'>
      <NavBar />
      <div className="register__container">
        <div className="register__steps">
          {
            steps.map((stepSelect, id) => {
              return <div key={id} className={`register__steps__step ${id === step ? '--current' : ''}`}>{stepSelect.value}</div>
            })
          }
        </div>
        <div className="register__content">
          <Card title={`Let's ${steps[step].title}`}>
            {step === 0 && <UserRegister />}
            {step === 1 && <RestaurantRegister />}
            {step === 2 && <MenuRegister registerType />}
          </Card>
        </div>
        <div className="register__buttons">
          <button className="--prev hvr-i-left" onClick={e => handlePrev(e)}>
            <i className="material-icons hvr-i">arrow_back</i>
            Back
          </button>
          <button type='submit' form={steps[step].form} className="hvr-i-right" onClick={handleNext}>
            {step !== 2 ? 'Next' : 'Finish'}
            <i className="material-icons hvr-i">arrow_forward</i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register
