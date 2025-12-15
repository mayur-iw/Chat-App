import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Avtar from "../component/Avtar";
import toast,{Toaster} from "react-hot-toast";
import { setUser ,setToken } from "../redux/UserSlice";
import { useDispatch } from "react-redux";

const CheckPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    
    useEffect(()=>{
      if(!location?.state?.name){
        navigate('/email')
      }
    },[])
    const [data, setdata] = useState({
      password: "",
      userId : ""
    });

    // useEffect(()=>{

    // },[]);
  
    const handleOnChange = (e) => {
      const { name, value } = e.target;
      console.log(e.target);
      setdata((preve) => {
        return {
          ...preve,
          [name]: value,
        };
      });
    };
  
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/password`;

      try {
        const response = await axios({
          method:'post',
          url:URL,
          data:{
          userId: location?.state?._id,
          password:data.password
          },
          withCredentials:true
        });

         toast.success(response.data.message);

      
        if(response.data.success){
            dispatch(setToken(response?.data?.token));
            localStorage.setItem('token', response?.data.token);
            setdata({
              password: ""
            });
            navigate('/home');
         }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    
  return (
    <div className="mt-5 flex justify-center">
      <div className="bg-white w-full max-w-sm mx-4 rounded overflow-hidden p-4">
        <div className="w-fit mx-auto mb-1 flex justify-center items-center flex-col">
          <h3 className="font-semibold text-lg mb-2">Welcom to React chat application : </h3>
          {/* <LuCircleUser 
            size={50}
            /> */}
            <Avtar name={location.state?.name} width={"70"} height={"80"} imageUrl={location?.state?.profile_pic} userId={location?.state?._id} />
            <h1 className="font-semibold text-lg mt-1">{location?.state?.name}</h1>
        </div>
        
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="flex flex-col ">
            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Please enter your Password "
                className="bg-slate-100 px-2 py-1 focus:outline-[#00adb5] "
                value={data.password}
                onChange={handleOnChange}
                required
              ></input>
            </div>
          </div>

          <button className="bg-[#00adb5] w-full mt-3 px-4 py-1 font-bold text-white  hover:bg-[#0e787d]">
            Submit
          </button>
        </form>

        <p className="my-3 text-center">
          {" "}
          <Link to={"/forgot-password"} className="hover:text-[#00adb5] font-semibold">
            Forgot Password?
          </Link>
        </p>
      </div>
    </div>
  )
}

export default CheckPassword;
