import React from 'react'
import styles from './Categories.module.scss'
import Aghyan from '../../assets/Aghayan.jpg'
import SetW from '../../assets/SetW.jpg'
import Banovan from '../../assets/Banovan.jpg'

const Categories = () => {
    return (
        <section className={styles.container}>

            <img src={Aghyan} alt="ساعت مردانه"/>
            <img src={Banovan} alt="ساعت زنانه"/>
            <img src={SetW} alt="ساعت ست"/>

        </section>
    )
}

export default Categories