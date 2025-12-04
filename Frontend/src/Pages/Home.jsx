import React from 'react';
import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'; 
import { Outlet, useNavigate } from 'react-router-dom';
import { logOut, setUser , setToken } from '../redux/UserSlice';
import SideBar from '../component/SideBar';

const Home = () => {
  
  const user = useSelector(state=>state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
  const featchUserDetails =async()=>{
    try {
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
      const response = await axios ({
        url : URL,
        withCredentials : true
      })
      // console.log("response response",response.data.date);
      dispatch(setUser(response?.data?.date));

      if(response.data.logout){
        dispatch(logOut());
        navigate('/email');
      }

    } catch (error) {
      console.log("error",error);
    }
  }

  useEffect(()=>{
    featchUserDetails();
  },[]);

  return (
    <div className='grid lg:grid-cols-[300px_1fr] h-screen max-h-screen'>
      <section className='bg-white'><SideBar /></section>
      <section><Outlet/> :</section>
    </div>
  )
}

export default Home;
