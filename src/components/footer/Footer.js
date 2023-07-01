import React from "react";
import styles from './Footer.module.scss'

import {
  FaTelegramPlane, FaWhatsapp
  , FaInstagram, FaGooglePlus
} from "react-icons/fa";

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (

    <section>



    <div className={styles.footer}>
    &copy; {year} تمام حقوق تایم جوی متعلق به آقای فاریابی میباشد ما همه وسیله ایم
    </div>
    
    

    </section>

  );
};

export default Footer;



    
// <div>
// <span>خدمات سایت</span>
// <ul>
//   <li>خدمات پس از فروش</li>
//   <li>  گارانتی اصالت و کیفیت  </li>
//   <li> مرجوعی تا هفت روز </li>
//   <li> پشتیبانی 24/7  </li>
// </ul>
// </div>

// <div>
// <span> راهنمای سایت  </span>
// <ul >
//   <li> فروشگاه </li>
//   <li>  ورود / عضویت  </li>
//   <li> درباره ی ما  </li>
//   <li> تماس با ما  </li>
// </ul>
// </div>

// <div>
// <span> راهنمای سایت  </span>
// <ul>
//   <li> فروشگاه </li>
//   <li>  ورود / عضویت  </li>
//   <li> درباره ی ما  </li>
//   <li> تماس با ما  </li>
// </ul>
// </div>

// <div>
// <span> تماس با ما </span>
// <ul>
//   <li> آدرس : ایران کرج </li>
//   <li> موبایل : 09121111111 </li>
//   <li>  تلفن :  34343434  </li>
//   <li> شبکه های اجتماعی </li>
//   <li className={styles.socailMedia}>
//     <FaTelegramPlane />
//     <FaWhatsapp />
//     <FaInstagram />
//     <FaGooglePlus />
//   </li>
// </ul>
// </div>
