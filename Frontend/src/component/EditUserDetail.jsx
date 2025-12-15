import React, { useEffect, useRef, useState } from 'react'
import Avtar from './Avtar';
import Devider from './Devider';
import uploadFile from '../helpers/uploadFile';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/UserSlice';


const EditUserDetail = ({onclose,user}) => {
    const uploadPhotoRef = useRef();
    const dispatch = useDispatch(); 
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

    const handleOpenUploadPhoto = (e)=>{
            uploadPhotoRef.current.click()
         e.preventDefault();
        e.stopPropagation();
            
    };

    const handleOnChange = (e)=>{
        const {name , value} = e.target;

        setFormData((preve)=>{
            return{
                ...preve,
                [name] : value,
            }
        })

    };

    const handleUploadPhoto = async (e)=>{
        const file = e.target.files[0];
        const uploadedPhoto = await uploadFile(file);
        

       setFormData((preve) => {
        return {
            ...preve,
            profile_pic : uploadedPhoto?.url + `?t=${Date.now()}`,

        };
    });
};

    const handleSubmit = async (e)=>{
        e.preventDefault();
        e.stopPropagation();
         try {
              const URL = `${import.meta.env.VITE_BACKEND_URL}/api/update-user`;
              const response = await axios({
                method:'post',
                url:URL,
                data:formData,
                withCredentials:true
              });

               toast.success(response?.data?.message);

              if(response.data.success){
                dispatch(setUser(response.data.data))
                onclose()
               }

              
            } catch (error) {
                toast.error(error?.response?.data?.message);
            
            }

           
    };

  return (
    <div className='fixed top-0 right-0 left-0 bottom-0 bg-gray-700/40 flex  justify-center items-center z-10'>
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
                <div>Profile Photo:</div>
                    <div className='my-1 flex items-center gap-4'>
                        <Avtar
                        width={40}
                        height={40}
                        name={formData.name}
                        imageUrl={formData?.profile_pic}
                        userId={user?._id}
                        />
                        <span>{console.log(formData?.profile_pic)}</span>
                        <label htmlFor='profile_pic'>
                            <button className='font-semibold' onClick={handleOpenUploadPhoto}>Change Photo</button>
                            <input 
                            type='file'
                            id='profile_pic'
                            className='hidden'
                            onChange={handleUploadPhoto}
                            ref={uploadPhotoRef}
                            />
                      </label>    
                    </div>
            </div>
            
            <Devider />
            <div className='flex gap-2 w-fit ml-auto'>
                <button onClick={onclose} className='border-[#00adb5] border text-[#00adb5] px-4 py-1 rounded hover:bg-[#00adb5] hover:text-white '>Cancle</button>
                <button type="button" onClick={handleSubmit} className='border-[#00adb5] border text-[#00adb5] px-4 py-1 rounded hover:bg-[#00adb5] hover:text-white'>Save</button>
            </div>

        </form>
      </div>
    </div>
  )
}

export default EditUserDetail
