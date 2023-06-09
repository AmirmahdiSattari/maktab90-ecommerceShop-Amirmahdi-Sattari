import React from 'react';
import styles from './auth.module.scss';
import resetImg from "../../assets/forgot.png";
import { Link } from 'react-router-dom';
import Card from './../../components/card/Card';

const Reset = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={resetImg} alt='Reset Password' width="400" />
      </div>

      <Card>
        <div className={styles.form}>
          <h2>تغییر رمز ورود</h2>
          <form>
            <input type="text" placeholder='پست الکترونیک'
              required />
            <button className='--btn --btn-primary
                         --btn-block'> ارسال لینک تغییر رمز عبور </button>
            <div className={styles.links}>
              <p>
                <Link to="/login"> - ورود </Link>
              </p>
              <p>
                <Link to="/register"> - ثبت نام </Link>
              </p>
            </div>
          </form>

        </div>
      </Card>
    </section>
  )
}

export default Reset