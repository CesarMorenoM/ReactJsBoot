import { useForm } from 'react-hook-form'
import './userRegister.scss'

const UserRegister = ({nextElement,setAccountInfo}) => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const createUser = data => {
    if (nextElement) {
      nextElement()
      setAccountInfo(data)
    }
  }

  return (
    <form className='userRegister form' id='userRegister' onSubmit={handleSubmit(createUser)}>

      <label className='label --first' >Fisrt name  </label>
      <input className='input' placeholder='First Name'
        {...register('firstName', { required: 'Please put your  first name' })} />
      <span className='error'>{errors?.name?.message}</span>

      <label className='label' >Last name </label>
      <input className='input' placeholder='Last Name'
        {...register('lastName', { required: 'Please put your last name' })} />
      <span className='error'>{errors?.name?.message}</span>

      <label className='label'>Email</label>
      <input className='input' placeholder='Email' type='mail'
        {...register('email', { required: 'Please put your email' })} />
      <span className='error' >{errors?.email?.message}</span>

      <label className='label'>Password</label>
      <input name='password' className='input' placeholder='Password' type='password'
        {...register('password', { required: 'Please put your password' })} />
      <span className="error">{errors?.password?.message}</span>

      <input className='input' placeholder='Repeat your password' type='password'
        {...register('password_copy', { required: 'Please repeat your password' })} />
      <span className="error">{errors?.password_copy?.message}</span>


    </form>
  )
}

export default UserRegister
