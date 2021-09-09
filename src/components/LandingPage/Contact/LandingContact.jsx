//libraries
import { useForm } from "react-hook-form"
import emailjs from "emailjs-com"
import toast from 'react-hot-toast'
//images
import contactImage from '../../../static/contact-restaurant.jpg'
import './landingContact.scss'


const LandingContact = () => {

  const { register, handleSubmit } = useForm()
  const onSubmit = data => { }

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_s8ni6vf', 'template_biyemmx', e.target, 'user_hjF6J0V7czIiJTj6BMXEX')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      e.target.reset()
      toast('¡El mensaje ha sido enviado!', { icon: '✉', duration: 3000 })
  }

  return (
    <div className="contact">
      <form className="contact__form" onSubmit={sendEmail}>
        <h2 className="contact__form__title">Contact us!</h2>
        <input className="contact__form__field" placeholder="Name" {...register("nombre", { required: true })} name="name" />
        <input className="contact__form__field" type="email" placeholder="Email" {...register("email", { required: true })} name="email" />
        <input className="contact__form__field" placeholder="Subject" {...register("asunto", { required: true })} name="subject"/>
        <input className="contact__form__field" defaultValue={''} placeholder="How can we help you?" {...register("cuerpo", { required: true })} name="body"/>
        <button className="contact__form__submit" type="input">Send</button>
      </form>
      <div className="contact__image" style={{ backgroundImage: `url(${contactImage})` }}>
        <span>The best moments for our diners</span>
      </div>
    </div>
  )
}

export default LandingContact
