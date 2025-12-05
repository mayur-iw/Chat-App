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


import React, { useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import Avtar from '../component/Avtar';
import { useSelector } from "react-redux";
import EditUserDetail from "./EditUserDetail";
import SearchUser from "./SearchUser";

const SideBar = () => {
    const user = useSelector(state => state.user);
    const [editUserOpen, setEditUserOpen] = useState(false); // ← spelling fix: serteditUserOpen → setEditUserOpen
    const [allUser,setAllUser] = useState([]);
    const [openSearchBar,setOpenSeachbar] = useState(false);

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
                <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center scrollbar">
                   {
                    allUser.length === 0 && (
                      <div>
                        <p className="text-lg text-center text-slate-400">Explor users to start conversiation.</p>
                      </div>
                    )
                   }
                       
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