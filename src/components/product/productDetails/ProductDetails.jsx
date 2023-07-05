import React, { useState, useEffect } from 'react'
import styles from './ProductDetails.module.scss'
import { Link, NavLink } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../../../assets/spinner.jpg'


const ProductDetails = () => {


    const { id } = useParams()

    let orders = localStorage.getItem('orders') ? JSON.parse(localStorage.getItem('orders')) : [];

    const [data, setData] = useState({
        productName: '',
        productPrice: 0,
        productBrand: '',
        productDescription: '',
        productThumbnail: null,
    })

    const [cart, setCart] = useState({
        addToCart: 0,
        removeFromCart: 0,
        totalValue: 0,
    })

    const addToCart = () => {
        setCart((pervCart) => ({
            ...pervCart,
            addToCart: pervCart.addToCart + 1,
        }))
    };

    const decreaseCart = () => {
        setCart((prevCart) => ({
            ...prevCart,
            addToCart: prevCart.addToCart - 1,
            removeFromCart: prevCart.removeFromCart + 1,
        }))
    };

    const handleOrder = () => {
        console.log(cart.totalValue)
        if (cart.totalValue >= 1) {
            let newOrder = {
                "user": "647daab7d41ce3ae608857c1",
                "products": [
                    {
                        "product": { id },
                        "count": cart.totalValue
                    }
                ],
                "deliveryStatus": false
            }

            orders.push(newOrder);
            setCart((pervState) => ({
                ...pervState,
                addToCart: 0,
                removeFromCart: 0,
                totalValues: 0
            }));
            localStorage.setItem('orders', JSON.stringify(orders));
            console.log(" 📌 here is Orders 📌 ", orders)
        } else {
            console.log("no registerd")
        }
    }

    const dataInfo = {
        method: 'get',
        url: `http://localhost:8000/api/products/${id}`
    }

    useEffect(() => {
        const totalValue = cart.addToCart - cart.removeFromCart;
        setCart((prevCart) => ({
            ...prevCart,
            totalValue,
        }));
    }, [cart.addToCart, cart.removeFromCart]);

    useEffect(() => {

        console.log(id)
        axios(dataInfo).then((res) => {

            console.log(res)
            setData({
                productName: res.data.data.product.name,
                productPrice: res.data.data.product.price,
                productBrand: res.data.data.product.brand,
                productDescription: res.data.data.product.description,
                productId: res.data.data.product._id,
                productThumbnail: res.data.data.product.thumbnail,
                productImage: res.data.data.product.images[0],
            })

        }).catch((err) => {

            console.log(err)
        })
    }, [])

    return (
        <div>

            <div className={`container ${styles.product}`} style={{ paddingTop: '2rem' }}>

                <h2> جزئیات محصولات  </h2>
                <div>
                    <Link to="/#products">&larr; برگشت به خانه </Link>
                </div>

                <div className={styles.details}>

                    <div className={styles.img}>

                        <div className={styles.thumbnailImage}>
                            <img className={styles.thumbnailImage} 
                            src={`http://localhost:8000/images/products/thumbnails/${data.productThumbnail}`}/>
                        </div>

                        <div className={styles.otherImages}>
                            <img className={styles.otherImages}
                            src={`http://localhost:8000/images/products/images/${data.productImage}`}/>
                        </div>

                    </div>
                    <div className={styles.content}>
                        <h3>{data.productName}</h3>
                        <p className={styles.price}> {data.productPrice} تومان </p>
                        <p> <b> توضیحات </b> {data.productDescription} </p>

                        <p>
                            <b> کد کالا </b> {data.productId}
                        </p>

                        <p>
                            <b> برند  </b> {data.productBrand}
                        </p>

                        <div className={styles.count}>
                            {cart.totalValue < 0 ? null : (
                                <>
                                    <button
                                        className="--btn"
                                        onClick={() => decreaseCart()}
                                    >
                                        -
                                    </button>
                                    <p>
                                        <b>{cart.totalValue}</b>
                                    </p>
                                    <button
                                        className="--btn"
                                        onClick={() => addToCart()}
                                    >
                                        +
                                    </button>
                                </>
                            )}
                        </div>

                        <button
                            onClick={handleOrder}
                            className="--btn --btn-danger">
                            افزودن به سبد خرید
                        </button>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default ProductDetails