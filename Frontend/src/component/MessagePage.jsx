import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { socket } from '../Socket/Socket'
import Avtar from './Avtar';
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoArrowBackSharp } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import { FaFileImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import uploadFile from '../helpers/uploadFile';
import { IoClose } from "react-icons/io5";
import LoadingSpiner from './LoadingSpiner';
import Background from '../assets/wallapaper.jpeg'
import { IoSendSharp } from "react-icons/io5";
import { io } from "socket.io-client";
import moment from 'moment'


const MessagePage = () => {
  const params = useParams()
  // const socketConnection = useSelector(state => state?.user?.SocketConnection)
  const currentUserDetails = useSelector(state => state?.user)
  const [dataUser, setDatauser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: "false",
    _id: ""
  })
  const currentMessage = useRef(null)

  useEffect(()=>{
    if(currentMessage.current){
      currentMessage.current.scrollIntoView({ behavior : 'smooth' ,block : 'end' })
    }
  })

  const [openImageVideo, setOpenImageVideo] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: ""
  })
  const[loading,setLoading] = useState(false);
  const[allMessage,setAllMessage]=useState([])

  // console.log("socketConnection",socketConnection);
  // useEffect(() => {
  //   if (!socket) return;

  //   const handler = (data) => {
  //     // console.log("message-user:", data);
  //     setDatauser(data)
  //   };

  //   socket.on("message-user", handler);
  //   socket.emit("message-page", params.userId);

  //   return () => socket.off("message-user", handler);
  // }, [params.userId]);

    useEffect(() => {
      if (!socket || !socket.connected) return;

      const userId = params.userId;

      // ❗ Guard: only emit for real Mongo ObjectId
      if (!userId || userId === "home") return;

      const handler = (data) => {
        setDatauser(data);
      };

      socket.on("message-user", handler);
      socket.emit("message-page", userId);

      socket.on("message", (messages) => {
            setAllMessage(messages)
        });


      return () => {
        socket.off("message-user", handler);
      };
    }, [params.userId]);


  // console.log("dataUserdataUser", dataUser, currentUserDetails);

  const handleClick = () => {
    setOpenImageVideo(preve => !preve);
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

      setLoading(true)
      const uploadedPhoto = await uploadFile(file);
      setLoading(false)
      setOpenImageVideo(false)

    setMessage(preve => {
      return {
        ...preve,
        imageUrl: uploadedPhoto.url
      }
    })

  }

  const handleClearUploadPhoto = ()=>{
     setMessage(preve => {
      return {
        ...preve,
        imageUrl: ""
      }
    })
  }
  
  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];

    setLoading(true)
    const uploadedVideo = await uploadFile(file);
    setLoading(false)
    setOpenImageVideo(false)
    
    setMessage(preve => {
      return {
        ...preve,
        videoUrl: uploadedVideo.url
      }
    })
  }

  const handleClearUploadVideo = ()=>{
     setMessage(preve => {
      return {
        ...preve,
        videoUrl: ""
      }
    })
  }

  const handleOnChange = (e)=>{
     const {name,value} = e.target

     setMessage(preve=>{
        return{
          ...preve,
          text : value
        }
     })

  }

  // const handleSubmit = (e)=>{
  //     e.preventDefault();
  //     // e.stopPropagation();

  //     if(message.text || message.videoUrl || message.imageUrl){
  //         if(socketConnection){
  //           socketConnection.emit('new-message',{
  //             sender: currentUserDetails?._id,
  //             reciver : params.userId,
  //             text: message.text,
  //             videoUrl: message.videoUrl,
  //             imageUrl: message.imageUrl
  //           })
  //         }
  //     }
  // }

    const handleSubmit = (e) => {
      e.preventDefault();

      if (!message.text && !message.imageUrl && !message.videoUrl) return;
      if (!socket.connected) return;

      socket.emit("new-message", {
        sender: currentUserDetails?._id,
        receiver: params.userId,
        text: message.text,
        imageUrl: message.imageUrl,
        videoUrl: message.videoUrl,
        messageByUser:currentUserDetails?._id,
        createdAt: new Date().toISOString()
      });

      setMessage({
        text: "",
        imageUrl: "",
        videoUrl: ""
      });
    };


  return (
    <div style={{ backgroundImage : `url(${Background})` }} className='bg-no-repeat bg-cover'>
      <header className='sticky top-0 h-16 bg-white flex items-center justify-between px-4'>
        <Link to={'/'} className='lg:hidden' ><IoArrowBackSharp size={25} /></Link>
        <div className='flex item-center gap-4'>
          <div>
            <Avtar width={50}
              height={50}
              name={dataUser?.name}
              imageUrl={dataUser?.profile_pic}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className='font-semibold text-lg my-0'>{dataUser?.name} </h3>
            <p className='-my-2'>
              {

                dataUser?.online ? <span className='text-green-600'>online</span> : <span className='text-red-600'>offline</span>

              }
            </p>
          </div>
        </div>
        <div>
          <button className=' hover:text-[#00adb5] cursor-pointer'>
            <BsThreeDotsVertical />
          </button>
        </div>


      </header>

      {/* Message  */}

      <section className='h-[calc(100vh-128px)] overflow-x-hidden overflow-y-scroll scrollbar relative bg-slate-200/50'>

        
        {/* Show All messages */}

        <div className='flex flex-col gap-2 py-2 mx-2' ref={currentMessage}>
          {
            allMessage.map((msg,index)=>{
              return(
                <div  className={`bg-white p-1 py-1 mx-2 w-fit rounded max-w-[280px] md:max-w-sm lg:max-w-md ${currentUserDetails._id === msg.messageByUser ? "ml-auto" : ""}`}>
                    <div>
                      {
                        msg?.imageUrl && (
                          <img 
                            src={msg?.imageUrl}
                            className='object-scale-down w-full h-full'
                          />
                        )
                      }
                    </div>
                    <div>
                      {
                        msg?.videoUrl && (
                          <video 
                            src={msg?.videoUrl}
                            className='object-scale-down w-full h-full'
                            controls
                          />
                        )
                      }
                    </div>
                   <p className='px-2'>{msg.text}</p> 
                   <p className='w-fit text-xs ml-auto'>{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }
        </div>


          {
          message.imageUrl && (
            <div className='w-full h-full stickey bottom-0 bg-slate-700/30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-45 right-100 cursor-pointer hover:text-red-600' onClick={handleClearUploadPhoto}>
                <IoClose size={30} />
              </div>
              <div className='bg-white p-3'>
                <img
                  src={message.imageUrl}
                  alt='Uploaded Image'
                  className='w-full h-full aspect-square max-w-sm m-2 object-scale-down'
                />
              </div>
            </div>
          )
        }

        {
          message.videoUrl && (
            <div className='w-full h-full stickey bottom-0 bg-slate-700/30 flex justify-center items-center rounded overflow-hidden'>
              <div className='w-fit p-2 absolute top-45 right-100 cursor-pointer hover:text-red-600' onClick={handleClearUploadVideo}>
                <IoClose size={30} />
              </div>
              <div className='bg-white p-3'>
                <video
                  src={message.videoUrl}
                  controls
                  autoPlay
                  muted
                  className='w-full h-full aspect-square max-w-sm m-2 object-scale-down'
                />
              </div>
            </div>
          )
        }

        {
          loading && (
            <div className='w-full h-full stickey bottom-0 flex justify-center items-center'><LoadingSpiner /></div> 
          ) 
        }



      </section>

      {/* Send message  */}

      <section className='h-16 bg-white flex items-center px-4'>
        <div className='relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-[#00adb5] text-black '>
          <button className='cursor-pointer' onClick={handleClick}>
            <FiPlus size={20} />
          </button>

          {/* video and image  */}

          {
            openImageVideo && (

              <div className='bg-white shadow rounded absolute bottom-14 w-36 p-2 left-5' >
                <form>
                  <label htmlFor='uploadImage' className='flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer'>
                    <div className='text-[#00adb5]'>
                      <FaFileImage size={18} />
                    </div>
                    <p>
                      Image
                    </p>
                  </label>
                  <label htmlFor='uploadVideo' className='flex items-center p-2 gap-3 hover:bg-slate-200 cursor-pointer'>
                    <div className='text-purple-500'>
                      <FaVideo size={18} />
                    </div>
                    <p>
                      Video
                    </p>
                  </label>

                  <input
                    type='file'
                    id='uploadImage'
                    onChange={handleUploadPhoto}
                    className='hidden'
                  />

                  <input
                    type='file'
                    id='uploadVideo'
                    accept="video/*"
                    onChange={handleUploadVideo}
                    className='hidden'
                  />


                </form>
              </div>

            )
          }
        </div>

        {/* input box  */}

        <form className='h-full w-full flex gap-2' onSubmit={handleSubmit}>

          <input
            type='text'
            placeholder='Please enter your Message'
            className='outline-none w-full h-full px-4 py-1'
            value={message.text}
            onChange={handleOnChange}
          />

          <button className='hover:text-[#00adb5]'>
            <IoSendSharp size={25}/>
          </button>

        </form>


      </section>
    </div>
  )
}

export default MessagePage;
