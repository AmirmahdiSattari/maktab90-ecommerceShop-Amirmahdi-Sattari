import React, { useState, useEffect } from 'react';
import styles from './ProductOrder.module.scss';
import { Link } from "react-router-dom";
import axios from 'axios';

const ProductOrder = () => {

    const [productData, setProductData] = useState([]);
    const [totalValue, setTotalValue] = useState(0);
    const [renderComponent, setRenderComponent] = useState(false);

    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

    console.log("📌Orders here", orders);

    const [axiosCompleted, setAxiosCompleted] = useState(false);

    useEffect(() => {
        if (!axiosCompleted) {
            const productIds = orders.map((res) => res.products[0].product.id);

            Promise.all(
                productIds.map((productId) => axios(`http://localhost:8000/api/products/${productId}`))
            )
                .then((responses) => {
                    const productsData = responses.map((res) => res.data.data.product);
                    setProductData(productsData);
                    console.log("🟠Product Data State", productData);
                    setAxiosCompleted(true);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [orders, axiosCompleted]);

    useEffect(() => {
        if (productData.length > 0) {
            console.log("🟠Product Data State", productData);
        }
    }, [productData]);

    const decreaseCart = (e) => {

        const productId = e.target.id;

        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

        const updatedOrders = storedOrders.map((order) => {
            if (order.products[0].product.id === productId && order.products[0].count >= 1) {
                order.products[0].count -= 1;
                console.log("🔴", order.products[0].count)
            }
            if (order.products[0].count == 0) {
                console.log("i run")

                const productId = order.products[0].product.id;
                console.log("🔴productId:", productId);

                // Remove the order with matching product ID from local storage
                const updatedOrders = orders.filter((order) => order.products[0].product.id !== productId);
                localStorage.setItem('orders', JSON.stringify(updatedOrders));

                // Update the productData state to reflect the removed order
                const updatedProductData = productData.filter((product) => product._id !== productId);
                setProductData(updatedProductData);


            }
            return order;
        });

        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        setRenderComponent(!renderComponent);
    }

    const addToCart = (e) => {

        const productId = e.target.id;

        const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];

        const updatedOrders = storedOrders.map((order) => {
            if (order.products[0].product.id === productId) {
                order.products[0].count += 1;
            }
            return order;
        });

        localStorage.setItem('orders', JSON.stringify(updatedOrders));
        setRenderComponent(!renderComponent);

    }

    const totalPrice = orders.reduce((total, order) => {
        const res = productData.find((product) => product._id === order.products[0].product.id);
        if (res) {
            const price = res.price * order.products[0].count;
            return total + price;
        } else {
            return total;
        }
    }, 0);

    const formattedTotalPrice = totalPrice ? totalPrice.toLocaleString() : 'خطا در محاسبه';
    console.log(" 🔵 ", formattedTotalPrice);

    const handleClearLocal = () => {
        localStorage.removeItem('orders');
        setProductData([])
        setRenderComponent(!renderComponent);
    }

    const handleDeleteOrder = (event) => {

        const productId = event.target.id;
        console.log("🔴productId:", productId);

        // Remove the order with matching product ID from local storage
        const updatedOrders = orders.filter((order) => order.products[0].product.id !== productId);
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        // Update the productData state to reflect the removed order
        const updatedProductData = productData.filter((product) => product._id !== productId);
        setProductData(updatedProductData);
    }

    return (
        <section>
            <div className={`container ${styles.table}`}>
                <h2> سبد خرید</h2>
                {productData.length === 0 ? (
                    <>
                        <p>هنوز محصولی انتخاب نکردید</p>
                        <br />
                        <div>
                            <Link to="/#products">&larr; ادامه ی خرید</Link>
                        </div>
                    </>
                ) : (
                    <>
                        <table>
                            <thead>
                                <tr>
                                    <th>
                                        نام ساعت
                                    </th>
                                    <th>
                                        تصویر ساعت
                                    </th>
                                    <th>
                                        قیمت
                                    </th>
                                    <th>
                                        موجودی
                                    </th>
                                    <th>
                                        قیمت
                                    </th>
                                    <th>
                                        حذف
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.map((res) => {
                                    return (
                                        <tr key={res._id} id={res._id}>
                                            <td>{
                                                res.name}</td>
                                            <td>
                                                <img
                                                    src={`http://localhost:8000/images/products/thumbnails/${res.thumbnail}`}
                                                    alt={'name'}
                                                    style={{ width: "100px" }}
                                                />
                                            </td>
                                            <td>{

                                                res.price

                                            } تومان</td>
                                            <td>
                                                <div className={styles.count}>
                                                    <button
                                                        className="--btn"
                                                        id={res._id}
                                                        onClick={(e) => decreaseCart(e)}
                                                    >
                                                        -
                                                    </button>
                                                    <p>
                                                        <b>
                                                            {orders.map((order) => {
                                                                console.log(order.products[0].product.id)
                                                                return order.products[0].product.id == res._id ? order.products[0].count : console.log('محصولی پیدا نشد')
                                                            })}
                                                        </b>
                                                    </p>
                                                    <button
                                                        className="--btn"
                                                        id={res._id}
                                                        onClick={(e) => addToCart(e)}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                {orders.map((order) => {
                                                    {
                                                        let price = order.products[0].product.id == res._id ? (res.price * order.products[0].count) : console.log('محصولی پیدا نشد');
                                                        let formattedPrice = price ? price.toLocaleString() : '';
                                                        return formattedPrice;
                                                    }
                                                })}
                                            </td>
                                            <td id={res._id}
                                                onClick={(res) => handleDeleteOrder(res)}
                                                style={{
                                                    cursor: 'pointer',
                                                    color: 'red'
                                                }}>
                                                حذف محصول
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className={styles.summary}>
                            <button className="--btn --btn-danger"
                                onClick={handleClearLocal}>
                                خالی کردن سبد خرید
                            </button>
                            <div className={styles.checkout}>
                                <div>
                                    <Link to="/#products">&larr; بازگشت به فروشگاه</Link>
                                </div>
                                <br />
                                <div cardClass={styles.card}>
                                    <div className={styles.text}>
                                        <h4>قیمت کل :</h4>
                                        <h3>{
                                            formattedTotalPrice
                                        }</h3>
                                    </div>
                                    <Link to='/cart/contact-info'>
                                        <button
                                            className="--btn --btn-primary --btn-block"
                                        >
                                            مرحله ی بعدی
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </section >


    )
}

export default ProductOrder