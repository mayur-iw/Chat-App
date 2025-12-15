  import React from 'react';
  import { useEffect } from 'react';
  import axios from "axios";
  import { useDispatch, useSelector } from 'react-redux'; 
  import { Outlet, useLocation, useNavigate } from 'react-router-dom';
  import { logOut, setUser , setToken, setOnlineUser } from '../redux/UserSlice';
  import SideBar from '../component/SideBar';
  import logo from '../assets/logo.png';
  import io from 'socket.io-client';

  const Home = () => {
    
    const user = useSelector(state=>state.user);
    
        
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const basePath = location.pathname === '/';

    
    const featchUserDetails =async()=>{
      try {
        const URL = `${import.meta.env.VITE_BACKEND_URL}/api/user-details`;
        const response = await axios ({
          url : URL,
          withCredentials : true
        })
        // console.log("response response",response.data.date);
        dispatch(setUser(response?.data?.date));
        // console.log("Logiut response",response);
        // if(response.data.data.logout){
        //   dispatch(logOut());
        //   navigate('/email');
        // }

      } catch (error) {
        console.log("error",error);
      }
    }

    useEffect(()=>{
      featchUserDetails();
    },[]);



    // socket connectio 

    useEffect(()=>{
      const socketConnection =  io(import.meta.env.VITE_BACKEND_URL,{
        auth :{
          token : localStorage.getItem('token')
        }
      })

      socketConnection.on('onlineUsers',(data)=>{
        dispatch(setOnlineUser(data))
        // console.log(data);
      })

      // dispatch(setSocketConnection(socketConnection))

      return ()=>{
        socketConnection.disconnect()
      }
    },[])


    return (
      <div className='grid lg:grid-cols-[300px_1fr] h-screen max-h-screen'>
        <section className={`bg-white ${!basePath && "hidden"} lg:block`}><SideBar /></section>
        <section className={`${basePath && "hidden"}`}><Outlet/> </section>

        <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex" }`}>
          <div>
            <img  src={logo} width={200} alt='Logo' />
          </div>
          <p className='text-lg mt-2 text-slate-400'>Select User to send the Message : </p>
        </div>

      </div>
    )


  }

  export default Home;
