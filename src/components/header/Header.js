import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaSearch } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        Gil<span>da</span>
      </h2>
    </Link>
  </div>
);

const cart = (
  <span className={styles.cart}>
    <Link to="/cart">
      <FaShoppingCart size={20} style={{ padding: '0 3px' }} />
      سبد خرید
    </Link>
  </span>
);

const activeLink = (({ isActive }) => isActive ? `${styles.active}` : '')

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [adminAccess, setAdminAccess] = useState(false);

  useEffect(() => {
    const cookies = document.cookie.split(';');
    const adminCookie = cookies.find(cookie => cookie.trim().startsWith('admin='));
    if (adminCookie) {
      const [, value] = adminCookie.split('=');
      setAdminAccess(true);
    } else {
      setAdminAccess(false);
    }

  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const logout = () => {
    document.cookie = 'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.reload();
  }

  return (
    <header>
      <div className={styles.header}>
        {logo}


        <nav
          className={
            showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
          }>
          <div
            className={
              showMenu
                ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                : `${styles["nav-wrapper"]}`
            } onClick={hideMenu}></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="#fff" onClick={hideMenu} />
            </li>


            {adminAccess ?
              <Link to='admin/admin/home'>
                <li className={`${styles.adminArea} ${activeLink}`}> ادمین </li></Link>
              : ''
            }

            <li>
              <NavLink to="/" className={activeLink}>خانه</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>ارتباط با ما</NavLink>
            </li>
          </ul>
          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              {adminAccess ? <NavLink to="/" className={activeLink}
                onClick={logout}>خروج</NavLink>
                :
                <span>
                  <NavLink to="/login" className={activeLink}>ورود</NavLink>
                  <NavLink to="/register" className={activeLink} >ثبت نام </NavLink>
                  <NavLink to="/order-history" className={activeLink}> سفارش های من </NavLink>
                </span>
              }
            </span>
            {cart}

            <div className={styles.searchInput}>
              <FaSearch />
              <input type='search' />
            </div>
            
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {cart}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
