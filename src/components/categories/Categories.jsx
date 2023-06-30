import React from 'react'
import styles from './Categories.module.scss'
import Aghyan from '../../assets/Aghayan.jpg'
import SetW from '../../assets/SetW.jpg'
import Banovan from '../../assets/Banovan.jpg'

import { Link, NavLink } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';

const Categories = () => {

    const categoryData = {
        mardane: `saat-mrdanh`,
        zanane: `saat-znanh`,
        saatSet: `saat-hay-st`
    }

    return (
        <section className={styles.container}>

            <Link to={`/categories/${categoryData.mardane}`}>
                <img src={Aghyan} alt={categoryData.mardane} />
            </Link>

            <Link to={`/categories/${categoryData.zanane}`}>
                <img src={Banovan} alt={categoryData.zanane} />
            </Link>

            <Link to={`/categories/${categoryData.saatSet}`}>
                <img src={SetW} alt={categoryData.saatSet} />
            </Link>

        </section>
    )
}

export default Categories