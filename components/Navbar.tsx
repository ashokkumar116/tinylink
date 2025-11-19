import React from 'react'

import { RiLinksFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";


const Navbar = () => {
  return (
    <div className='px-20 py-5 bg-white shadow-md flex items-center justify-between fixed top-0 w-full z-10'>
        <div className='flex items-center gap-2'>
            <RiLinksFill className='text-2xl' />
            <p className='text-2xl font-semibold'>TinyLink</p>
        </div>
        <div>
          <FaRegUserCircle className='text-2xl' />
        </div>
    </div>
  )
}

export default Navbar
