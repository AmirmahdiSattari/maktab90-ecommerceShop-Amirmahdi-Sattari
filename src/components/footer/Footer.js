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
    <div className="flex flex-col">

      <div className={styles.footer}>
     
        &copy; {year}  تمام حقوق تایم جوی متعلق به  <span style={{color:'#ff4500', padding:'0 5px'}} >  استاد فاریابی   </span> میباشد ما همه وسیله ایم
      </div>
    </div>
  );
};

//    // &copy; {year} تمامی حقوق تایم جوی محفوض میباشد

/////
// <div className={styles.upperSection}>
// <div className={styles.footerSection}>
//   <h4>خدمات سایت</h4>
//   <ul  className={styles.footerSection}>
//     <li>خدمات پس از فروش</li>
//     <li>  گارانتی اصالت و کیفیت  </li>
//     <li> مرجوعی تا هفت روز </li>
//     <li> پشتیبانی 24/7  </li>
//   </ul>
// </div>
// <div  className={styles.footerSection}>
//   <h4> راهنمای سایت  </h4>
//   <ul  className={styles.footerSection}>
//     <li> فروشگاه </li>
//     <li>  ورود / عضویت  </li>
//     <li> درباره ی ما  </li>
//     <li> تماس با ما  </li>
//   </ul>
// </div>
// <div  className={styles.footerSection}>
//   <h4> راهنمای سایت  </h4>
//   <ul  className={styles.footerSection}>
//     <li> فروشگاه </li>
//     <li>  ورود / عضویت  </li>
//     <li> درباره ی ما  </li>
//     <li> تماس با ما  </li>
//   </ul>
// </div>
// <div  className={styles.footerSection}>
//   <h4> تماس با ما </h4>
//   <ul  className={styles.footerSection}>
//     <li> آدرس : ایران کرج </li>
//     <li> موبایل : 09121111111 </li>
//     <li>  تلفن :  34343434  </li>
//     <li> شبکه های اجتماعی </li>
//     <li className={styles.socailMedia}>
//       <FaTelegramPlane />
//       <FaWhatsapp />
//       <FaInstagram />
//       <FaGooglePlus />
//     </li>
//   </ul>
// </div>
// </div>

export default Footer;
