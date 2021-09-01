//libraries
import { useForm } from "react-hook-form"
//images
import contactImage from '../../../static/contact-restaurant.jpg'
import './landingContact.scss'

const LandingContact = () => {

  const { register, handleSubmit } = useForm()
  const onSubmit = data => { }

  return (
    <div className="contact">
      <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="contact__form__title">Contact us!</h2>
        <input className="contact__form__field" placeholder="Name" {...register("nombre", { required: true })} />
        <input className="contact__form__field" type="email" placeholder="Email" {...register("email", { required: true })} />
        <input className="contact__form__field" placeholder="Subject" {...register("asunto", { required: true })} />
        <input className="contact__form__field" defaultValue={''} placeholder="How can we help you?" {...register("cuerpo", { required: true })} />
        <button className="contact__form__submit" type="input">Send</button>
      </form>
      <div className="contact__image" style={{ backgroundImage: `url(${contactImage})` }}>
        <span>The best moments for our diners</span>
      </div>
    </div>
  )
}

export default LandingContact
