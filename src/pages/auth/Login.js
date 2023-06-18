import React from 'react';
import styles from './auth.module.scss';
import loginImg from "../../assets/login.png";
import { Link } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import Card from './../../components/card/Card';
import { ToastContainer, toast } from 'react-toastify';
import { AdminOnlyRoute } from './../../components/adminOnlyRoute/AdminOnlyRoute';


const Login = (clear=true) => {
 

    const validation = (e) => {
        e.preventDefault();

        let userNameInput = e.target[0].value.trim();
        let passwordInput = e.target[1].value.trim();

        // Define regex patterns for username and password validation
        const userNamePattern = /^[a-zA-Z0-9_-]{3,16}$/;
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;

        // Check if username input is empty or doesn't match pattern
        if (userNameInput === '') {
            toast('نام کاربری را وارد کنید')
            return;
        } else if (!userNamePattern.test(userNameInput)) {
            toast('نام کاربری معتبر نیست')
            return;
        }

        // Check if password input is empty or doesn't match pattern
        if (passwordInput === '') {
            toast('رمز عبور را وارد کنید')
            return;
        } else if (!passwordPattern.test(passwordInput)) {
            toast("رمز عبور معتبر نیست")
            return;
        } else {

            console.log("🟢")

        }

        AdminOnlyRoute(e)
        console.log(e)

    }


    return (
        <section className={`container ${styles.auth}`}>

            <div className={styles.img}>
                <img src={loginImg} alt='Login' width="400" />
            </div>
            <Card>
                <div className={styles.form}>
                    <h2>ورود</h2>

                    <form onSubmit={(e) => { validation(e) }}>
                        <input type="text" placeholder='نام کاربری'
                            required />
                        <input type="password" placeholder='رمز ورود'
                            required />
                        <button className='--btn --btn-primary
                         --btn-block' type='submit'>ورود</button>
                        <div className={styles.links}>
                            <Link to='/reset'>فراموشی رمز عبور</Link>
                        </div>
                        <p>-- or --</p>
                        <button className='--btn --btn-danger
                         --btn-block'> ورود با گوگل <FaGoogle color="#fff" /></button>
                        <span className={styles.register}>
                            <p> حساب کاربری نداری!؟ </p>
                            <Link to='/register'> ثبت نام  </Link>
                        </span>
                    </form>

                </div>
            </Card>

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
        </section>
    )
}

export default Login
