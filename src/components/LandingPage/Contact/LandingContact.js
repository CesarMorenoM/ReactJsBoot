import { useForm } from "react-hook-form";
import contactImage from '../../../static/contact-restaurant.jpg'
import './landingContact.scss'

const LandingContact = () => {

  const { register, handleSubmit } = useForm();
  const onSubmit = data => { }

  return (
    <div className="contact">
      <form className="contact__form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="contact__form__title">¡Contactanos!</h2>
        <input className="contact__form__field" placeholder="Nombre" {...register("nombre", { required: true })} />
        <input className="contact__form__field" type="email" placeholder="Correo electrónico" {...register("email", { required: true })} />
        <input className="contact__form__field" placeholder="Asunto" {...register("asunto", { required: true })} />
        <input className="contact__form__field" defaultValue={''} placeholder="¿En que podemos ayudarte?" {...register("cuerpo", { required: true })} />
        <button className="contact__form__submit" type="input">Send</button>
      </form>
      <div className="contact__image" style={{ backgroundImage: `url(${contactImage})` }}>
        <span>Los mejores momentos para nuestros comensales</span>
      </div>
    </div>
  )
}

export default LandingContact
