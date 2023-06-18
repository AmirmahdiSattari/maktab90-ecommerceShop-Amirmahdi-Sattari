import React from 'react';
import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const activeLink = (({ isActive }) => isActive ? `${styles.active}` : '')

const Navbar = () => {

    const notifySuccess = () => toast("successfull");
    const notifyError = () => toast("Error");


    return (
        <div className={styles.navbar}>

            <div className={styles.user}>
                <FaUserCircle size={40}
                    color="#fff" />
                <h4>  ادمین </h4>
            </div>

            <nav>
                <ul>
                    <li>
                        <NavLink to="admin/home"
                            className={activeLink}>
                            خانه
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="admin/all-product"
                            className={activeLink}>
                            همه ی محصولات
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="admin/add-product/ADD"
                            className={activeLink}>
                            محصول جدید
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="admin/orders"
                            className={activeLink}>
                            سفارش ها
                        </NavLink>
                    </li>
                </ul>
            </nav>
          

            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Navbar