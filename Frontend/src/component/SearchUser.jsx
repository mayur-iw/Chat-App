import React, { useEffect, useState } from 'react'
import { MdPersonSearch } from "react-icons/md";
import LoadingSpiner from './LoadingSpiner';
import UserSearch from './UserSearch';
import toast from 'react-hot-toast';
import axios from 'axios';
// import { search } from '../../../server/router';
import { IoIosClose } from "react-icons/io";


function SearchUser({onclose}) {
    const [searchUser,setSearchUser] = useState([]);
    const [loading,setloadong] = useState(false);
    const [search,setSearch] = useState("");

    
    const handleSeachUser = async()=>{
        const URL = `${import.meta.env.VITE_BACKEND_URL}/api/search-user`;

        if (!search.trim()) {
        setSearchUser([]);
        setloadong(false);
        return;
    }
    try {
        setloadong(true);
        const response = await axios.post(URL,{
            search : search
        }) 
        setloadong(false);
        setSearchUser(response.data.data);

        } catch (error) {
            toast.error(error?.response?.data?.message)
        }finally {
            setloadong(false);
        }

    }

    useEffect(()=>{
        handleSeachUser()
    },[search])

    // console.log("searchUser",searchUser);

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-700/60 p-2 z-10'>
      <div className='w-full max-w-lg mx-auto mt-10'>
        <div className='bg-white rounded h-14 overflow-hidden flex'>
            <input 
            type='text'
            placeholder='Search user by Name,Email..'
            className='w-full outline-none py-1 h-full px-4'
            onChange={(e)=>setSearch(e.target.value)}
            value={search}
            />
            {/* <div className='h-14 w-14 flex justify-center items-center'><MdPersonSearch size={30}/></div> */}
            <div className='h-14 w-14 flex justify-center items-center'>
                {search ? (
                // Close icon when typing
                <IoIosClose
                    size={26}
                   onClick={() => onclose()
                    // onclose={onclose}    
                    }
                />
                ) : (
                // Search icon when empty
                <MdPersonSearch size={30} />
                )}
            </div>
        </div>

        {/* dispay search */}

        <div className='bg-white mt-2 w-full p-4 rounded '>
            {
                searchUser.length === 0 && !loading && (
                    <p className='text-center text-slate-500'>No user Found..!!</p>
                )
            }
            {
                loading && (
                    <LoadingSpiner />
                )
            }
            {
                searchUser.length !== 0 && !loading &&(
                    searchUser.map((user,index)=>{
                        return(
                            <UserSearch key={user._id} user={user} onclose={onclose} />
                        )
                    })
                )
            }
        </div>

      </div>
    </div>
  )
}

export default SearchUser
