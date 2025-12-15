import React from 'react'
import Avtar from '../component/Avtar'
import { Link } from 'react-router-dom';

function UserSearch({user,onclose}) {
  return (
    <Link to={"/"+user?._id} onClick={onclose} className='flex items-center gap-3 p-2 lg:p-4 border-transparent border-2 rounded border-b-slate-200 hover:border-[#0e787d] cursor-pointer'>
      <div>
        <Avtar
        width={50}
        height={50}
        name={user?.name}
        imageUrl={user?.profile_pic}
        userId={user?._id}
        />
      </div>
      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
          {user?.name}
        </div>
        <p className='text-sm text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserSearch;
