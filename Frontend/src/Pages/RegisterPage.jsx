import React, { useState } from 'react'
// import  '../styles/colors.css'
import { IoClose } from "react-icons/io5";

const RegisterPage = () => {
  const [photo,setphoto]=useState("")
  const [data,setdata]= useState({
    name:"Name",
    email:"",
    password:"",
    profile_pic:""
  })

  const handleOnChange = (e)=>{
    const { name, value } = e.target
    setdata((prev)=>{
      return {
      ...prev,
        [name]: value
      }
    })
  }

 

  const handleChangePhoto=(e)=>{
    const file = e.target.files[0];
    setphoto(file);
    console.log("UPloaded photo",file)
  };

  const handleClerUploadPhoto = (e)=>{ 
    e.preventDefault()
    // e.stopPropogation()
    setphoto("")
  }

  return (
    <div className='mt-5 flex justify-center'>
      <div className='bg-white w-full max-w-sm mx-4 rounded overflow-hidden p-4'>
        <h3>Welcom to React chat application : </h3>        
          <form className='mt-5'>
              <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1'>
                  <label htmlFor='name'>Name :</label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    placeholder='Please enter your name '
                    className='bg-slate-100 px-2 py-1 focus:outline-[#00adb5] '
                    value={data.name}
                    onChange = {handleOnChange}
                    required
                    >
                  </input>
                </div>

                <div className='flex flex-col gap-1'>
                  <label htmlFor='email'>Email :</label>
                  <input
                    type='email'
                    id='email'
                    email='email'
                    placeholder='Please enter your Email '
                    className='bg-slate-100 px-2 py-1 focus:outline-[#00adb5] '
                    value={data.email}
                    onChange={handleOnChange}
                    required
                  > 
                  </input>

                </div>

                <div className='flex flex-col gap-1'>              
                  <label htmlFor='password'>Password :</label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Please enter your Password '
                    className='bg-slate-100 px-2 py-1 focus:outline-[#00adb5]'
                    value={data.password}
                    onChange={handleOnChange}
                    required
                    >
                  </input>
                </div>
                  
                <div className='flex flex-col gap-1'> 
                  <label htmlFor='profile_pic'>Profile pic :

                    <div className='h-14 bg-slate-200 flex justify-center items-center rounded border-0 hover:border-2 hover:border-[#00adb5] cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1 '>
                        {
                          photo?.name ? photo.name : "Please Upload Your profile Photo :"
                        } 
                      </p>
                      {
                        photo?<button className='hover:text-red-600' onClick={handleClerUploadPhoto}><IoClose /></button> :""
                      }
                     
                    </div>

                  </label>
                  <input
                    type="file"               
                    id='profile_pic'
                    name='profile_pic'
                    className='bg-slate-100 px-2 py-1 focus:outline-[#00adb5] '
                    hidden  
                    required
                    onChange={handleChangePhoto}

                    >
                  </input>
                </div>
              </div>  
                <button
                  className='bg-[#00adb5] w-full p-2 mt-2.5'
                >
                  Submit
                </button>
          </form>
      </div>
    </div>
  )
}

export default RegisterPage
