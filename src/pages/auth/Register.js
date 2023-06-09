import React from 'react';
import styles from './auth.module.scss';
import registerImg from "../../assets/register.png";
import { Link } from 'react-router-dom';

import Card from './../../components/card/Card';

const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>ثبت نام</h2>

          <form>
            <input type="text" placeholder='پست الکترونیک'
              required />
            <input type="password" placeholder='رمز ورود'
              required />
            <input type="password" placeholder="تکرار رمز"
              required />
            <button className='--btn --btn-primary
                    --btn-block'>ثبت نام</button>
            <span className={styles.register}>
              <p> حساب کاربری داری!؟ </p>
              <Link to='/login'> ورود </Link>
            </span>
          </form>

        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt='Login' width="400" />
      </div>
    </section>
  )
}

export default Register
