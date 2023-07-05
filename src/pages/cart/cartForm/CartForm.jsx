import React, { useState, useEffect } from 'react';
import styles from './CartForm.module.scss';
import { FaBackspace } from 'react-icons/fa';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Spinner from '../../../assets/spinner.jpg'
import { Link } from 'react-router-dom';

let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];
console.log("📌all Orders here", orders);

const CartForm = (e) => {

    const [deliveryDate, setDeliveryDate] = useState(null);
    const [renderComponent, setRenderComponent] = useState(false);

    function handleDeliveryDateChange(date) {
        setDeliveryDate(date);
    }


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


    const handleValidateData = (e) => {

        e.preventDefault();
        console.log("started")
        console.log(e)

        let userName = e.target[0].value;
        let userLastName = e.target[1].value;
        let userPhoneNumber = e.target[2].value;
        let userDeliveryDate = deliveryDate;
        let userAddress = e.target[4].value;

        // Regular expressions for validation
        const nameRegex = /^[A-Za-z\s]+$/;
        const phoneRegex = /^09[0-9]{9}$/;
        const lastNameRegex = /^[A-Za-z\s\-]+$/;
        const addressRegex = /^[A-Za-z0-9\s\-،]+$/;

        // Validate name
        if (!nameRegex.test(userName)) {
            toast.error('لطفا نام معتبر وارد کنید');
            return;
        }

        // Validate last name
        if (!nameRegex.test(userLastName)) {
            toast.error('لطفا نام خانوادگی معتبر وارد کنید');
            return;
        }

        // Validate phone number
        if (!phoneRegex.test(userPhoneNumber)) {
            toast.error('لطفا شماره تلفن معتبر وارد کنید');
            return;
        }

        // Validate delivery date
        if (!userDeliveryDate || userDeliveryDate < new Date()) {
            toast.error('تاریخ تحویل باید در آینده باشد');
            return;
        }

        // Validate address
        if (!addressRegex.test(userAddress)) {
            toast.error('لطفا آدرس معتبر وارد کنید');
            return;
        }

        // Validation passed, do something
        const products = orders.map((res) => {
            console.log(res.products[0].product.id)
            return {
                product: res.products[0].product.id,
                count: res.products[0].count,
            }
        });

        const order = {
            user: "647daab7d41ce3ae608857c1",
            products: products,
            deliveryStatus: false,
        };

        // Post order data to backend
        axios.post('http://localhost:8000/api/orders', order)
            .then((response) => {
                console.log('Order submitted successfully:', response.data);
                localStorage.removeItem('orders');
                toast('اطلاعات با موفقیت ارسال شد');
                // e.target.reset();
                setRenderComponent(!renderComponent)
                
                window.location.replace('/payment');

            })
            .catch((error) => {
                console.log('Error submitting order:', error);
                toast.error('خطا در ارسال اطلاعات!');
            });

    }

    return (
        <>
            <main>
                <div>
                    <div className={styles.backward}>
                        <FaBackspace />
                    </div>

                    {adminAccess ?

                        <form onSubmit={(e) => handleValidateData(e)}>

                            <div>
                                <label> نام   : </label>
                                <input type='text' />
                            </div>

                            <div>
                                <label>   نام خانوادگی: </label>
                                <input type='text' />
                            </div>
                            <div>
                                <label>  تلفن همراه </label>
                                <input type='number' />
                            </div>


                            <div>
                                <label> تاریخ تحویل : </label>
                                <DatePicker
                                    selected={deliveryDate}
                                    onChange={handleDeliveryDateChange}
                                    dateFormat="yyyy/MM/dd"
                                    placeholderText="انتخاب تاریخ"
                                    isRTL={true}
                                    showMonthDropdown
                                    showYearDropdown
                                    dropdownMode="select"
                                />
                            </div>

                            <div>
                                <label> آدرس : </label>
                                <textarea></textarea>
                            </div>

                            <div className={styles.buttonContainer}>
                                <button className={styles.buttonAddData} type="submit"> پرداخت  </button>
                            </div>

                        </form>

                        :
                        <div>ابتدا وارد اکلنت خود شوید
                            <Link to="/login">
                            <span> -- ورود / ثبت نام  --</span>
                            </Link>
                        </div>

                    }

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
                        theme="light" />


                </div>
            </main >
        </>
    )
}

export default CartForm