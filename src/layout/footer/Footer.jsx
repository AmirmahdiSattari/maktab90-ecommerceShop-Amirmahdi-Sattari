import React from 'react'
import {
  FaWhatsapp,
  FaGooglePlus,
  FaInstagram,
  FaTelegram,
  FaCheck
} from "react-icons/fa";

import enamad from '../../assets/enamad.jpg';
import samandehi from '../../assets/samandehi.jpg'
import etehadiye from '../../assets/etehadiye.jpg'


const Footer = () => {
  return (
    <>
      <div className='flex text-white w-screen bg-[#242424]
     justify-between justify-items-start p-2
     font-vazir shadow-2xl flex-wrap'>

        <div className='aboutUs 
      flex flex-col px-4 py-4
      justify-center items-start'>
          <p className='text-lg font-bold pb-4 pt-2 text-[#ffffcc]'>درباره ی تایم جوی</p>
          <ul className='text-md flex flex-col
         h-full flex-wrap  justify-evenly text-sm '>
            <li>آدرس: کرج</li>
            <li>تلفن: 34444444</li>
            <li>همراه: 09129999999</li>
            <li>ایمیل: TimeJoy@gmail.com</li>
            <li className='flex  justify-between py-2 text-[#ffffcc]
          cursor-pointer text-lg'>
              <FaWhatsapp />
              <FaGooglePlus />
              <FaInstagram />
              <FaTelegram />
            </li>
          </ul>
        </div>

        <div className='  px-4 py-4  flex flex-col items-center
      justify-start'>
          <p className='w-full flex justify-start font-bold pb-4 pt-2 text-[#ffffcc]'>راهنمای سایت </p>
          <ul className='flex flex-col justify-evenly text-sm 
         h-full flex-wrap items-start w-full'>
            <li>روش های ارسال و رهگیری</li>
            <li>راهنمای ثبت سفارش</li>
            <li>روش های خرید</li>
            <li>راهنمایی اندازه گیری</li>
            <li>شرکای تجاری جوی تایم</li>
          </ul>
        </div>

        <div className=' flex flex-col 
      items-start justify-center px-4 py-4'>
          <p className=' font-bold pb-4 pt-2 text-[#ffffcc]'>خدمات تایم جوی </p>
          <ul className='flex flex-col justify-evenly text-sm 
         h-full flex-wrap'>
            <li className='flex justify-end flex-row-reverse'>گارانتی 30 روزه <FaCheck className='text-[#ffffcc] mx-1' /></li>
            <li className='flex justify-end flex-row-reverse'>مرجوعی کالا تا 7 روز <FaCheck className='text-[#ffffcc] mx-1' /></li>
            <li className='flex justify-end flex-row-reverse'>ارسال 3 روزه محصولات <FaCheck className='text-[#ffffcc] mx-1' /></li>
            <li className='flex justify-end flex-row-reverse'>تضمین اصالت کالا <FaCheck className='text-[#ffffcc] mx-1' /></li>
            <li className='flex justify-end flex-row-reverse'>خدمات پس از فروش <FaCheck className='text-[#ffffcc] mx-1' /></li>
          </ul>
        </div>

        <div className=' flex flex-col 
      justify-center items-center px-12 py-4 
   '>
          <span className='text-[#ffffcc]'>مجوز ها</span>
          <ul className='flex 
         flex-col'>
            <li><img src={enamad} className="rounded-md
          shadow-2xl w-[4rem] my-2 " /></li>
            <li><img src={samandehi} className="rounded-md 
          shadow-2xl w-[4rem] my-2" /></li>
            <li ><img src={etehadiye} className="rounded-md
         shadow-2xl  w-[4rem] my-2" /></li>
          </ul>
        </div>
      </div>
      <div className='w-screen flex 
      justify-center text-[#ffffcc] bg-[#242424] py-2 
      text-sm'>
        <span className=' border-t border-[#ffffcc15] 
        py-2 w-[90%] flex justify-center items-center rounded-md'>
          Copyright © TimeJoy  2022-2023
        </span>
      </div>
    </>
  )
}

export default Footer
