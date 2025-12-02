import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFile";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

const RegisterPage = () => {
  const [photo, setphoto] = useState("");
  const navigate = useNavigate();
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
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

  const handleChangePhoto = async (e) => {
    const file = e.target.files[0];

    const uploadedPhoto = await uploadFile(file);
    setphoto(file);

    setdata((preve) => {
      return {
        ...preve,
        profile_pic: uploadedPhoto?.url,
      };
    });
  };

  const handleClerUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setphoto("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("import.meta.env.REACT_BACKEND_URL",import.meta.env.VITE_BACKEND_URL);
    // ${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}
    const URL = `${import.meta.env.VITE_BACKEND_URL}/api/register`;
    try {
      const response = await axios.post(URL, data);
       toast.success(response.data.message);

       if(response.data.success){
          setdata({
            name: "",
            email: "",
            password: "",
            profile_pic: "",
          });
          
          navigate('/email');
       }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="mt-5 flex justify-center">
      <div className="bg-white w-full max-w-sm mx-4 rounded overflow-hidden p-4">
        <h3>Welcom to React chat application : </h3>
        <form className="mt-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name :</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Please enter your name "
                className="bg-slate-100 px-2 py-1 focus:outline-[#00adb5] "
                value={data.name}
                onChange={handleOnChange}
                required
              ></input>
            </div>

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

            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password :</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Please enter your Password "
                className="bg-slate-100 px-2 py-1 focus:outline-[#00adb5]"
                value={data.password}
                onChange={handleOnChange}
                required
              ></input>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="profile_pic">
                Profile pic :
                <div className="h-14 bg-slate-200 flex justify-center items-center rounded border-0 hover:border-2 hover:border-[#00adb5] cursor-pointer">
                  <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1 ">
                    {photo?.name
                      ? photo.name
                      : "Please Upload Your profile Photo "}
                  </p>
                  {photo ? (
                    <button
                      className="hover:text-red-600"
                      onClick={handleClerUploadPhoto}
                    >
                      <IoClose />
                    </button>
                  ) : (
                    ""
                  )}
                </div>
              </label>
              <input
                type="file"
                id="profile_pic"
                name="profile_pic"
                className="bg-slate-100 px-2 py-1 focus:outline-[#00adb5]"
                hidden
                onChange={handleChangePhoto}
              ></input>
            </div>
          </div>

          <button className="bg-[#00adb5] w-full mt-3 px-4 py-1 font-bold text-white  hover:bg-[#0e787d]">
            Submit
          </button>
        </form>

        <p className="my-3 text-center">
          Already have Account ?{" "}
          <Link to={"/email"} className="hover:text-[#00adb5] font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
