import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";
import Avtar from "../component/Avtar";

const CheckPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [data, setdata] = useState({
      password: "",
      userId : ""
    });

    useEffect(()=>{

    },[]);
  
    const handleOnChange = (e) => {
      const { name, value } = e.target;
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
        const response = await axios.post(URL,{
          userId: location?.state?._id,
          password:data.password
        });

         toast.success(response.data.message);
  
         if(response.data.succsess){
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
            <div className="w-fit mx-auto mb-1">
              {/* <LuCircleUser 
                size={50}
                /> */}
                <Avtar width={70} height={70} />
            </div>
            <h3>Welcom to React chat application : </h3>
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
              New user ?{" "}
              <Link to={"/register"} className="hover:text-[#00adb5] font-semibold">
                Register
              </Link>
            </p>
          </div>
        </div>
  )
}

export default CheckPassword;
