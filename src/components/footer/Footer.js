import React from "react";
import styles from './Footer.module.scss'

const date = new Date();
const year = date.getFullYear();

const Footer = () => {
  return (
    <div className={styles.footer}>
      &copy; {year} تمامی حقوق تایم جوی محفوض میباشد
    </div>
  );
};

export default Footer;
