// import React, { useState } from "react";
// import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
// import { FaUserPlus } from "react-icons/fa";
// import { NavLink } from "react-router-dom";
// import { RiLogoutBoxLine } from "react-icons/ri";
// import Avtar from '../component/Avtar'
// import { useSelector } from "react-redux";
// import EditUserDetail from "./EditUserDetail";
// import Devider from "./Devider";

// const SideBar = () => {
//     const user = useSelector(state =>state.user);
   
//     const [editUserOpen,setEditUserOpen] = useState(false);
//   return (
//     <div className="w-full h-full grid grid-cols-[70px_1fr] bg-white">
//       <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-tb-lg py-8 text-slate-600 flex flex-col justify-between">
//         <div className="flex flex-col gap-8">
//           <NavLink
//             title="Chat"
//             className={({ isActive }) =>
//               `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive} && bg-slate-200`
//             }
//           >
//             <IoChatbubbleEllipsesSharp size={20} />
//           </NavLink>
//           <div
//             title="Add Friend"
//             className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
//           >
//             <FaUserPlus size={20} />
//           </div>
//         </div>

       
//           <div className="flex flex-col items-center">
//             <button className="mx-auto cursor-pointer" title={user?.name} onClick={()=>setEditUserOpen(true)}>
//                 <Avtar 
//                 key={user?.profile_pic}
//                 height={40}
//                 width={40}
//                 name={user?.name}
//                 imageUrl={user?.profile_pic}
//                 />
//             </button>

//             <button title="Logout" className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded">
//               <span className="-ml-1">
//                 <RiLogoutBoxLine size={20} />
//               </span>
//             </button>
//           </div>
        
//       </div>

//       <div className="flex flex-col w-full">
//           <div className="flex items-center h-16">
//             <h2 className="text-xl font-bold p-4 text-slate-500">
//               Message
//             </h2>
//           </div>
//         <div className="bg-slate-200 p-[0.5px]"></div>
//       </div>

//       <div className="flex-1 overflow-y-auto bg-slate-50 flex flex-col items-center justify-center">

//       </div>


//       {
//         editUserOpen && (
//             <EditUserDetail onclose={()=>setEditUserOpen(false)} user={user} />
//         )
//       }
//     </div>
//   );
// };

// export default SideBar;


import React, { useEffect, useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {  useParams } from 'react-router-dom';
import Avtar from "../component/Avtar";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import EditUserDetail from "./EditUserDetail";
import SearchUser from "./SearchUser";
import { io } from "socket.io-client";
import { socket } from '../Socket/Socket'
import { FaFileImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";

const SideBar = () => {
    const user = useSelector(state => state.user);
    const [editUserOpen, setEditUserOpen] = useState(false); // ← spelling fix: serteditUserOpen → setEditUserOpen
    const [allUser,setAllUser] = useState([]);
    const params = useParams()
    const [openSearchBar,setOpenSeachbar] = useState(false);
    const userId = params.userId;
    // const socketConnection = useSelector(state => state?.user?.SocketConnection)

    // console.log("socketConnection",socket)


    // useEffect(()=>{
    //     //  if (!socket || !socket.connected) return;
        
    //     if(socket){
    //         socket.emit('sidebar',user?._id)
    //         console.log("user?._id",user?._id);
    //     }

    //     socket.on('Conversation',(data)=>{
    //         console.log("conversiation",data)
    //     })

    // },[socket,user?._id,userId])

    // useEffect(() => {
    //     if (socket) {
    //         // Emit current user's ID for sidebar (your existing code)
    //         socket.emit('sidebar', user?._id);

    //         // Emit receiver ID to get conversation (new)
    //         if(userId){
    //         socket.emit('load-conversation', { senderId: user?._id, receiverId: userId });
    //         }

    //         // Listen to conversation data
    //         socket.on('Conversation', (data) => {
    //         console.log('Conversation', data);

    //       // 🔥 FIXED LOGIC HERE
    //     const conversiationData = data.map((conv) => {
    //     const isSender = conv.sender?._id === user._id;

    //     return {
    //         ...conv,
    //         userDetails: isSender ? conv.receiver : conv.sender
    //     };
    //     });

    //     setAllUser(conversiationData);
    
    //         });

    //         // Clean up on unmount
    //         return () => {
    //         socket.off('Conversation');
    //         };
    //     }
    //     }, [socket, user?._id, userId]);

        // console.log("setAllUser",setAllUser)


        // ... inside the SideBar component
// ... inside the SideBar component

// ... inside the SideBar component

useEffect(() => {
    if (socket && user?._id) { 
        socket.emit('sidebar', user._id);

        socket.on('Conversation', (data) => {
            console.log('Conversation raw data:', data);

            // Use a map to hold the single, latest conversation object for each unique user ID
            const latestConversations = {}; 

            data.forEach((conv) => {
                const isSender = conv.sender?._id === user._id;
                const otherUserDetails = isSender ? conv.receiver : conv.sender;
                const otherUserId = otherUserDetails?._id;

                if (otherUserId) {
                    const currentMessageTime = new Date(conv.lastMessage?.createdAt || 0).getTime();
                    
                    // 1. Get the current best conversation entry for this user (if it exists)
                    const existingEntry = latestConversations[otherUserId];
                    const existingMessageTime = new Date(existingEntry?.lastMessage?.createdAt || 0).getTime();

                    // 2. Decide if the current 'conv' is newer or if this is the first entry
                    if (!existingEntry || currentMessageTime > existingMessageTime) {
                        // This conversation is newer or it's the first time we see this user.
                        // Store the normalized conversation object.
                        const conversationEntry = {
                            ...conv,
                            userDetails: otherUserDetails,
                        };
                        latestConversations[otherUserId] = conversationEntry;
                    }
                }
            });

            // Convert the map values back to an array
            const uniqueConversationList = Object.values(latestConversations);
            
            // Sort the final list to display the most recently active chat at the top
            uniqueConversationList.sort((a, b) => {
                const timeA = new Date(a.lastMessage?.createdAt || 0).getTime();
                const timeB = new Date(b.lastMessage?.createdAt || 0).getTime();
                // Sort descending (b - a) to show latest conversation first
                return timeB - timeA; 
            });


            setAllUser(uniqueConversationList);
        });

        return () => {
            socket.off('Conversation');
        };
    }
}, [socket, user?._id]);

    return (
        <div className="w-full h-full grid grid-cols-[70px_1fr] bg-white overflow-hidden">
            {/* Left Narrow Sidebar */}
            <div className="bg-slate-100 h-full py-8 text-slate-600 flex flex-col justify-between border-r border-slate-200">
                <div className="flex flex-col gap-8">
                    <NavLink
                        to="/"
                        title="Chat"
                        className={({ isActive }) =>
                            `w-full flex justify-center items-center hover:bg-slate-200 transition ${isActive ? 'bg-slate-200' : ''}`
                        }
                    >
                        <IoChatbubbleEllipsesSharp size={28} />
                    </NavLink>

                    <div
                        onClick={()=>setOpenSeachbar(true)}
                        title="Add Friend"
                        className="w-full flex justify-center items-center hover:bg-slate-200 transition cursor-pointer"
                    >
                        <FaUserPlus size={28} />
                    </div>
                </div>

                <div className="flex flex-col items-center gap-8">
                    <button
                        title={user?.name}
                        onClick={() => setEditUserOpen(true)}
                        className="hover:bg-slate-200 rounded-full p-1 transition"
                    >
                        <Avtar
                            key={user?.profile_pic}
                            height={45}
                            width={45}
                            name={user?.name}
                            imageUrl={user?.profile_pic}
                            userId={user?._id}
                        />
                    </button>

                    <button
                        title="Logout"
                        className="w-full flex justify-center items-center hover:bg-slate-200 transition"
                    >
                        <RiLogoutBoxLine size={28} />
                    </button>
                </div>
            </div>

            {/* Right Main Area */}
            <div className="flex flex-col h-full">
                {/* Header */}
                <div className="bg-white border-b border-slate-200 px-6 py-4">
                    <h2 className="text-2xl font-bold text-slate-800">Message</h2>
                </div>

                {/* Divider */}
                <div className="bg-slate-200 h-[1px]"></div>

                {/* Scrollable Message List Area */}
                {/* <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center scrollbar divide-y divide-slate-100">
                   {
                    allUser.length === 0 && (
                      <div>
                        <p className="text-lg text-center text-slate-400">Explor users to start conversiation.</p>
                      </div>
                    )
                   }

                   {
                    allUser.map((conv,index)=>{
                        return(
                        <div key={conv?._id} className="flex items-center gap-2 py-2">
                            <div >
                                <Avtar
                                    imageUrl={conv?.userDetails?.profile_pic}
                                    name={conv?.userDetails?.name}
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <div>
                               <h3 className="text-ellipsis line-clamp-1"> { conv?.userDetails?.name }</h3>

                                <div className="text-slate-500">
                                    <div>
                                        {
                                            conv?.lastMessage?.imageUrl && (
                                                   <div className="flex items-center gap-1">
                                                    <span> <FaFileImage /></span>
                                                    <span className="text-xs text-slate-500">Image</span>
                                                    </div>
                                            )
                                        }
                                        {
                                            conv?.lastMessage?.videoUrl && (
                                                   <div className="flex items-center gap-1">
                                                    <span> <FaVideo /></span>
                                                    <span className="text-xs text-slate-500">Video</span>
                                                    </div>
                                            )
                                        }
                                    </div>
                                </div>
                                <p className="text-xs text-slate-500">{conv?.lastMessage?.text} </p>
                            </div>
                        </div>
                        )
                        })
                    }        
                </div> */}

                <div className="flex-1 overflow-y-auto flex flex-col scrollbar divide-y divide-slate-100">
    {/* ...................... DIVIDER ADDED TO CONTAINER ...................... */}
    {/* ...................... [divide-y divide-slate-100] ...................... */}
    {
        allUser.length === 0 && (
            <div className="flex-1 flex items-center justify-center">
                <p className="text-lg text-center text-slate-400">Explore users to start a conversation.</p>
            </div>
        )
    }

    {allUser.map((conv) => {
        const otherUserId = conv?.userDetails?._id;
        if (!otherUserId) return null; // Safety check
        
        // Convert timestamp for display
        const lastMessageTime = conv.lastMessage?.createdAt 
            ? new Date(conv.lastMessage.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            : '';

        const isUserActive = userId === otherUserId; // Check if this chat is currently open

        return (
            <NavLink
                to={`/${otherUserId}`}
                key={otherUserId} // Use otherUserId as key since it's now unique
                className={`flex items-center gap-4 py-3 px-6 cursor-pointer transition relative ${
                   
                    isUserActive 
                        ? 'bg-blue-50 border-r-4 border-blue-600' // Active chat styling
                        : 'hover:bg-slate-50 border-r-4 border-transparent' // Default/Hover styling
                   
                }`}
            >
                {/* 1. Avatar */}
                <Avtar
                    imageUrl={conv.userDetails.profile_pic}
                    name={conv.userDetails.name}
                   
                    width={50}
                    height={50} // Increased size slightly
                   
                    userId={otherUserId}
                />
                
                <div className="flex flex-col flex-1 min-w-0">
                   
                    <div className="flex justify-between items-center mb-1">
                        <h3 className="text-base font-semibold text-slate-800 truncate">
                            {conv.userDetails.name}
                        </h3>
                        {lastMessageTime && (
                            <span className="text-xs text-slate-400 font-light ml-2">
                                {lastMessageTime}
                            </span>
                        )}
                    </div>
                  
                    <div className="text-sm text-slate-500 truncate">
                        {
                            conv.lastMessage?.imageUrl ? (
                                
                                <span className="flex items-center gap-1 italic">
                                    <FaFileImage size={14} className="text-blue-500" />
                                    <span>Photo</span>
                                </span>
                              
                            ) : conv.lastMessage?.videoUrl ? (
                                
                                <span className="flex items-center gap-1 italic">
                                    <FaVideo size={14} className="text-red-500" />
                                    <span>Video</span>
                                </span>
                               
                            ) : (
                                <p className="text-sm truncate">{conv.lastMessage?.text || "Start a conversation..."}</p>
                            )
                        }
                    </div>
                </div>
            </NavLink>
        );
    })}
</div>
            </div>

            {/* Edit Profile Modal */}
            {editUserOpen && (
                <EditUserDetail
                    onclose={() => setEditUserOpen(false)}
                    user={user}
                />
            )}

            {/* search bar */}

            {
              openSearchBar && (
                <SearchUser onclose={()=>setOpenSeachbar(false)} />
              )
            }
        </div>
    );
};

export default SideBar;