import React from 'react'

export const Card = () => {
    const eventImage='image.png'
  return (
    <div className='p-4 w-full flex flex-col border-[1.5px] rounded-lg gap-3 shadow-xl bg-white'>
      <p className='tracking-wide text-lg font-semibold truncate w-full'>
        Event Name That Might Be Too Long
      </p>

      <div className='relative w-full aspect-[4/3] bg-gray-200 rounded-md overflow-hidden'>

        <img
          src={eventImage}
          alt='Event Image'
          className='absolute top-0 left-0 w-full h-full object-fill'
        />
      </div>

      <p className='text-sm text-gray-700 line-clamp-3'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
        corporis repellendus dolores doloribus soluta. Rerum, perspiciatis. Quis
        quas ducimus dolorem nostrum nam.
      </p>

      <div className='w-full flex justify-between text-[18px] text-gray-600'>
        <p className='truncate max-w-[50%]'>Club Name</p>
        <p className='truncate max-w-[45%] text-right'>🗓️ May 27, 2025</p>
      </div>
    </div>
  )
}
