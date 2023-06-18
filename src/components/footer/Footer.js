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
        &copy; {year} تمام حقوق تایم جوی محفوض میباشد
      </div>
    </div>
  );
};
