import { useForm } from 'react-hook-form'
import './userRegister.scss'

const UserRegister = ({ user,nextElement,setAccountInfo }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  if (!user) user = {}
  
  const createUser = data => {
    if (nextElement) {
      nextElement()
      setAccountInfo(data)
    }
  }

  return (
    <form className='userRegister form' id='userRegister' onSubmit={handleSubmit(createUser)}>

      <div className="fill">
        <label className='label --first' >First Name</label>
        <label className='label --first' >Last Name</label>

        <input className='input' placeholder='Name' defaultValue={user.firstName || ''}
          {...register('firstName', { required: 'Please put your name' })} />
        <input className='input' placeholder='Last Name' defaultValue={user.lastName || ''}
          {...register('lastName', { required: 'Please put your last name' })} />
      </div>

      <label className='label'>Email</label>
      <input className='input' placeholder='Email' defaultValue={user.email || ''}
        {...register('email', { required: 'Please put your email' })} />
      <span className='error' >{errors?.email?.message}</span>

      {
        !user?null:
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
