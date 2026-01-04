import React from 'react'
import { useUser } from '../../context/UserContext'

const UserMatched = () => {
    const {user} = useUser()
  return (
    <div className='flex items-center justify-center flex-col gap-5'>
        <img src={user?.image} alt="" className='w-50 h-50 rounded-full' />
        <div>
            <h1 className='text-3xl font-semibold'>{user?.name}</h1>
             <div className="flex items-center justify-center gap-2 mt-2">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLZSoO1zUogOB233_S_6YL-eVPYaQXnRR5GA&s" alt="" className="w-7" />
                <p className=" text-lg">India</p>
              </div>
        </div>
    </div>
  )
}

export default UserMatched