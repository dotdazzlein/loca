import React, { useState } from 'react'

const Name = ({onNext} : {onNext : () => void }) => {
  const [name,setName] = useState<string>("Random")
  return (
    <div className='py-5 h-full flex flex-col justify-between'>
      <div>
        <h1 className='text-2xl font-bold'>My First Name</h1>
        <p className='text-sm text-gray-500 mt-2'>Your name will be shown in video chats.</p>
        <p className='text-sm text-gray-500 '>You can change it later!</p>

        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter your name' className="px-3 py-3 bg-secondary my-5 rounded-3xl w-full border border-gray-300 focus:outline-2 focus:outline-primary" />

      </div>
      <div>
        <button onClick={onNext} className='bg-primary cursor-pointer text-white w-full py-3  rounded-3xl font-semibold'>Next</button>
      </div>
    </div>
  )
}

export default Name