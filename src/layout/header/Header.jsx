import React from 'react'


import {
  FaBars,
  FaShoppingBasket,
  FaUserLock,
  FaPhone,
  FaHome
} from "react-icons/fa";


const Header = () => {

  const brandName = "TimeJoy"
  return (
    

    



    <div className='bg-[#242424] text-[#ffffff] w-screen h-[10%] 
    flex flex-row items-center 
    font-vazir justify-evenly shadow-2xl'>


      <div className=' font-pacifico text-[#ffffcc] hover:text-[#fefeab] text-xl
      sm:w-[10%] w-[40%]'>
        {brandName}
      </div>



      <p className=' sm:flex hidden  items-center hover:text-[#ffffcc] 
        transition duration-200 ease-in-out
        hover:scale-110'>
        <FaHome className='sm:flex hidden' />
        <span className='px-1'>خانه</span>
      </p>

      <p className=' sm:flex hidden  items-center hover:text-[#ffffcc] 
      transition duration-200 ease-in-out
      hover:scale-110'>
        <FaPhone className='sm:flex hidden' />
        <span className='px-1'>ارتباط باما</span>
      </p>

      <p className=' sm:flex hidden items-center hover:text-[#ffffcc] 
        transition duration-200 ease-in-out
        hover:scale-110'
      >
        <FaUserLock className='sm:flex hidden' />
        <span className='px-1'> ورود / ثبت نام</span>
      </p>

      <p className=' sm:flex hidden items-center hover:text-[#ffffcc] 
      transition duration-200 ease-in-out
      hover:scale-110'>
        <FaShoppingBasket className='sm:flex hidden' />
        <span className='px-1'>سبد خرید</span>
      </p>

      <p className=' sm:hidden  flex w-[50%] text-2xl justify-end items-center hover:text-[#ffffcc] 
      transition duration-200 ease-in-out
      hover:scale-105'>
        <FaBars className='sm:hidden flex' />
      </p>

    </div>
  )
}

export default Header
