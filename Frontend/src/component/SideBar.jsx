import React, { useState } from "react";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { RiLogoutBoxLine } from "react-icons/ri";
import Avtar from '../component/Avtar'
import { useSelector } from "react-redux";
import EditUserDetail from "./EditUserDetail";

const SideBar = () => {
    const user = useSelector(state =>state.user);
    const [editUserOpen,serteditUserOpen] = useState(true);
  return (
    <div className="w-full h-full">
      <div className="bg-slate-100 w-12 h-full rounded-tr-lg rounded-tb-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            title="Chat"
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded ${isActive} && bg-slate-200`
            }
          >
            <IoChatbubbleEllipsesSharp size={20} />
          </NavLink>
          <div
            title="Add Friend"
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded"
          >
            <FaUserPlus size={20} />
          </div>
        </div>

       
          <div className="flex flex-col items-center">
            <button className="mx-auto cursor-pointer" title={user?.name} onClick={()=>serteditUserOpen(true)}>
                <Avtar 
                height={40}
                width={40}
                name={user?.name}
                />
            </button>

            <button title="Logout" className="w-12 h-12 flex justify-center items-center cursor-pointer hover:bg-slate-200 rounded">
              <span className="-ml-1">
                <RiLogoutBoxLine size={20} />
              </span>
            </button>
          </div>
        
      </div>

      {
        editUserOpen && (
            <EditUserDetail onclose={()=>serteditUserOpen(false)} user={user} />
        )
      }
    </div>
  );
};

export default SideBar;
