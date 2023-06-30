import React from 'react';
import styles from './ViewAllProduct.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaWallet } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { Pagination, ThemeProvider } from '@mui/material';



const ViewAllProducts = (props) => {

    const { categoryId } = props;
    console.log(" Seleceted CategoryId in viewAll Product is  ", categoryId);

    const [data, setData] = useState(null);
    const [page, setPage] = useState(1);
    console.log(page)

    const handleFilterOrders = (e) => {
        console.log(e)
    }

    useEffect(() => {
      
        axios(`http://localhost:8000/api/products?page=${page}`).then((res) => {
            console.log(res.data.data.products)
            setData(res.data.data.products)
        }).catch((err) => {
            console.log(err)
        })

        if (categoryId) {
            axios(`http://localhost:8000/api/products?category=${categoryId}`).then((res) => {
                console.log(" 👉👉 ", res)
                setData(res.data.data.products)
            }).catch((err) => {
                console.log(err)
            })
        }

        console.log("page is now:", page);

    }, [page])

    const handleFilterViewProduct = (e) => {

        console.log(e)
        let status = e.target.value
        console.log(status)
        if (status != "All") {
            axios(`http://localhost:8000/api/products?sort=${status}`).then((res) => {

                console.log(res)
                setData(res.data.data.products)

            }).catch((err) => { console.log(err) })
        } else {
            axios.get(`http://localhost:8000/api/products?sort=price&quantity[gte]=10}`).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
    }
    if (data != null) {
        data.map((data) => { console.log(data.category == categoryId) })
    }

    const handleChangePage = (e) => {
        setPage(parseInt(e.target.innerText) );
    };


    return (
        <section>

            <div className={styles.filterProductContainer}>

                <ul className={`${styles.tgList}`}>
                    <li className={`${styles.gListItem}`}>
                        <h5>  ساعت های  موجود </h5>
                        <input className={`${styles.tgl} ${styles.tglFlip}`} id="cb5" type="checkbox" />
                        <label className={`${styles.tglBtn}`} data-tg-off="نه" data-tg-on="اره" for="cb5"></label>
                    </li>
                    <li className={`${styles.gListItem}`}>
                        <h5>ساعت های سوئیسی </h5>
                        <input className={`${styles.tgl} ${styles.tglFlip}`} id="cb5" type="checkbox" />
                        <label className={`${styles.tglBtn}`} data-tg-off="نه" data-tg-on="اره" for="cb5"></label>
                    </li>
                    <li className={`${styles.gListItem}`}>
                        <h5> ساعت های ژاپنی </h5>
                        <input className={`${styles.tgl} ${styles.tglFlip}`} id="cb5" type="checkbox" />
                        <label className={`${styles.tglBtn}`} data-tg-off="نه" data-tg-on="اره" for="cb5"></label>
                    </li>
                    <li className={`${styles.gListItem}`}>
                        <h5> ساعت های ایتالیایی</h5>
                        <input className={`${styles.tgl} ${styles.tglFlip}`} id="cb5" type="checkbox" />
                        <label className={`${styles.tglBtn}`} data-tg-off="نه" data-tg-on="اره" for="cb5"></label>
                    </li>
                </ul>
            </div>

            <div className={styles.cardMainContainer}>

                <div className={styles.UpperFilter}>
                    <label>فیلتر بر اساس : </label>
                    <div>
                        <label>
                            <input type="radio" name="radio" value={`-price`} onClick={(e) => handleFilterViewProduct(e)} />
                            <span> گرانترین </span>
                        </label>

                        <label>
                            <input type="radio" name="radio" value={"ساعت مجی"} onClick={(e) => handleFilterViewProduct(e)} />
                            <span> ساعت مچی </span>
                        </label>

                        <label>
                            <input type="radio" name="radio" value={"مردانه"} onClick={(e) => handleFilterViewProduct(e)} />
                            <span> ساعت مچی مردانه </span>
                        </label>

                        <label>
                            <input type="radio" name="radio" value={"زنانه"} onClick={(e) => handleFilterViewProduct(e)} />
                            <span> ساعت مچی زنانه </span>
                        </label>

                        <label>
                            <input type="radio" name="radio" value={"ست"} onClick={(e) => handleFilterViewProduct(e)} />
                            <span> ساعت های ست </span>
                        </label>

                        <label>
                            <input type="radio" name="radio" value={`price`} onClick={(e) => handleFilterViewProduct(e)} />
                            <span>
                                ارزانترین
                            </span>
                        </label>

                    </div>
                </div>

                <div className={styles.cardContainer}>

                    {data &&

                        data.map((data) => (
                            (data.category == categoryId || categoryId == 'All')
                                ?
                                <div className={styles.card}>
                                    <div className={styles.prodcutThumbnailContainer}>
                                        <img className={styles.prodcutThumbnail} src={`http://localhost:8000/images/products/thumbnails/${data.thumbnail}`} alt="ساعت " />
                                    </div>
                                    <div className={styles.productDataContainer}>
                                        <Link to={`/product-details/${data._id}`}>
                                            <p className={styles.productName}> {data.name} </p>
                                            <p className={styles.productPriceContainer}> {data.price} تومان
                                                <span>
                                                    <FaWallet className={styles.walletIcon} />
                                                </span>
                                            </p>
                                        </Link>
                                    </div>
                                </div>
                                :
                                ''
                        ))
                    }

                </div>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    direction: 'ltr',
                }}>
                    <Pagination
                        style={{ padding: "1rem 0" }}
                        count={10}
                        variant="outlined"
                        shape="rounded"
                        onClick={(e) => handleChangePage(e)}
                    />

                </div>
            </div>

        </section>
    )
}

export default ViewAllProducts