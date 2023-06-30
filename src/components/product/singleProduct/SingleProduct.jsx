import React from 'react';
import { FaWallet } from 'react-icons/fa';
import styles from './SingleProduct.module.scss';
import { Link } from 'react-router-dom';

const SingleProduct = () => {
    return (
        <div className={styles.cardContainer}>

            { 
             
                    <div className={styles.card}>
                        <div className={styles.prodcutThumbnailContainer}>
                            <img className={styles.prodcutThumbnail} src={`http://localhost:8000/images/products/thumbnails/${''}`} alt="ساعت " />
                        </div>
                        <div className={styles.productDataContainer}>
                            <Link to={`/product-details/${''}`}>
                                <p className={styles.productName}> {"data.name"} </p>
                                <p className={styles.productPriceContainer}> {'data.price'} تومان
                                    <span>
                                        <FaWallet className={styles.walletIcon} />
                                    </span>
                                </p>
                            </Link>
                        </div>

                    </div>
            }

        </div>
    )
}

export default SingleProduct