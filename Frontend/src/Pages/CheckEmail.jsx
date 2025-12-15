import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast,{Toaster} from "react-hot-toast";
import Avtar from "../component/Avtar";

const CheckEmail = () => {
    const navigate = useNavigate();
    const [data, setdata] = useState({
      email: ""
    });
  
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
      const URL = `${import.meta.env.VITE_BACKEND_URL}/api/email`;
      try {
        const response = await axios.post(URL, data);
         toast.success(response.data.message);  
         if(response.data.successs){
            setdata({
              email: ""
            });

            navigate('/password',
              {state:response?.data?.date}
            );
         }
      } catch (error) {
        toast.error(error.response?.data?.message);
      }
    };
    console.log("location.state?",location.state)
    
  return (
    <div className="mt-5 flex justify-center">
          <div className="bg-white w-full max-w-sm mx-4 rounded overflow-hidden p-4">
            <div className="w-fit mx-auto mb-1 flex justify-center items-center flex-col">
              {/* <LuCircleUser 
                size={50}
                /> */}
                <h3 className="font-semibold text-lg mt-1">Welcom to React chat application : </h3>
                <Avtar name={location.state?.name} width={"70"} height={"70"} imageUrl={location?.state?.profile_pic}  />
                {/* <h1 className="font-semibold text-lg mt-1">{location?.state?.name}</h1> */}
            </div>
            <form className="mt-3" onSubmit={handleSubmit}>
              <div className="flex flex-col ">
                <div className="flex flex-col gap-1">
                  <label htmlFor="email">Email :</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Please enter your Email "
                    className="bg-slate-100 px-2 py-1 focus:outline-[#00adb5] "
                    value={data.email}
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

export default CheckEmail
