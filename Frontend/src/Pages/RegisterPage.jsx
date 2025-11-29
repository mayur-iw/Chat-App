import React from 'react'

const RegisterPage = () => {
  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-sm mx-2 rounded overflow-hidden p-4'>
        <h3>Welcom to React chat application : </h3>        
          <form>
            <label htmlFor='name'>Name :</label>
            <input id='name' placeholder='Please enter your name ' required></input>

            <label id='email'>Email :</label>
            <input id='email' placeholder='Please enter your Email ' required></input>
            
            <label id='password'>Password :</label>
            <input id='password' placeholder='Please enter your Password ' required></input>
          </form>
      </div>
    </div>
  )
}

export default RegisterPage
