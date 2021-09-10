import { useForm } from 'react-hook-form'
import './userRegister.scss'

const UserRegister = ({ user }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  if (!user) user = {}

  const createUser = data => {
    console.log(data)
  }

  return (
    <form className='userRegister form' id='userRegister' onSubmit={handleSubmit(createUser)}>

      <label className='label --first' >Name <span>Your full name</span> </label>
      <input className='input' placeholder='Name' defaultValue={user.name || ''}
        {...register('name', { required: 'Please put your name' })} />
      <span className='error'>{errors?.name?.message}</span>

      <label className='label'>Email</label>
      <input className='input' placeholder='Email' defaultValue={user.email || ''}
        {...register('email', { required: 'Please put your email' })} />
      <span className='rror' >{errors?.email?.message}</span>

      {
        !user &&
        <>
          <label className='label'>Password</label>
          <input name='password' className='input' placeholder='Password' type='password'
            {...register('password', { required: 'Please put your password' })} />
          <span className="error">{errors?.password?.message}</span>

          <input className='input' placeholder='Repeat your password' type='password'
            {...register('password_copy', { required: 'Please repeat your password' })} />
          <span className="error">{errors?.password_copy?.message}</span>
        </>
      }



    </form>
  )
}

export default UserRegister
