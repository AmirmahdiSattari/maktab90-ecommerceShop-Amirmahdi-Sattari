import React from "react";
import styles from "./Admin.module.scss";
import { Routes, Route } from 'react-router-dom';
import Home from './../../components/admin/home/Home';
import Navbar from './../../components/admin/navbar/Navbar';
import ViewProduct from './../../components/admin/ViewProduct/ViewProduct';
import AddProduct from './../../components/admin/addProduct/AddProduct';
import Orders from './../../components/admin/order/Orders';

const Admin = () => {

  const cookies = document.cookie.split(';');
  const adminCookie = cookies.find(cookie => cookie.trim().startsWith('admin='));
  if (adminCookie) {
    const [, value] = adminCookie.split('=');
    console.log(value); // Output: "true"
  }else{
    window.location.replace('/');
  }

  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="admin/home" element={<Home />} />
          <Route path="admin/all-product" element={<ViewProduct />} />
          <Route path="admin/add-product/ADD" element={<AddProduct />} />
          <Route path="admin/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
