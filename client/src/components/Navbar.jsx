import React from 'react'
import LoginIcon from '@mui/icons-material/Login';
export const Navbar = () => {
  return (
    <div className='border-b-1 p-2 px-4 flex flex-row justify-between items-center'>
        <div className='flex text-xl'>
            <p className='font-stretch-150% font-extrabold'>Club</p>
            <p className='font-stretch-150% font-extrabold text-pink-600'>Queue</p>
        </div>

        <button className='flex gap-1 justify-center items-center border-3 rounded-lg p-1 px-2'>
            <p>Login</p>
            <LoginIcon/>
        </button>
    </div>
  )
}
