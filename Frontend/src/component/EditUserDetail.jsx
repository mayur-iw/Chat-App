import React, { useEffect, useState } from 'react'
import Avtar from './Avtar';
import Devider from './Devider';

const EditUserDetail = ({onclose,user}) => {
    const [formData,setFormData] = useState({
        name : user?.name,
        profile_pic : user?.profile_pic
    })

    useEffect(()=>{
        setFormData((preve)=>{
            return{
                ...preve,
                ...user
            }
        })
    },[user]);

    const handleOnChange = (e)=>{
        const {name , value} = e.target;

        setFormData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })

    };

    const handleUploadPhoto = async()=>{
        const file = e.target.files[0];
        const uploadedPhoto = await uploadFile(file);

        setdata((preve) => {
        return {
            ...preve,
            profile_pic: uploadedPhoto?.url,
        };
        });
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
        e.stopPropagation();
    };

  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 bg-gray-700/40 flex  justify-center items-center'>
      <div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
        <h2 className='font-semibold'>Profile details</h2>
        <p className='text-sm'>Edit User details</p>

        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-1'>
                <label htmlFor='name'>Name:</label>
                <input 
                type='name'
                id='name'
                name='name'
                value={formData.name}
                onChange={handleOnChange}
                className='w-full py-1 px-2 focus:outline-[#00adb5]'
                />
            </div>

            <div>
                <label htmlFor='profile_pic'>Profile Photo:</label>
                <div className='my-1 flex items-center gap-4'>
                    <Avtar
                    width={40}
                    height={40}
                    name={formData.name}
                    />
                    <button className='font-semibold'>Change Photo</button>
                    <input 
                    type='file'
                    className='hidden'
                    onChange={handleUploadPhoto}
                    />
                </div>
            </div>
            
            <Devider />
            <div className='flex gap-2 w-fit ml-auto mt-3'>
                <button className='border-[#00adb5] border text-[#00adb5] px-4 py-1 rounded '>Cancle</button>
                <button className='border-[#00adb5] border text-[#00adb5] px-4 py-1 rounded '>Save</button>
            </div>

        </form>
      </div>
    </div>
  )
}

export default EditUserDetail
