import React from 'react';
import styles from './Garanty.module.scss';

import ThreeHour from '../../assets/ThreeHour.jpg'
import Zemanat from '../../assets/Zemanat.jpg'
import FiveYear from '../../assets/FiveYear.jpg'
import FreeDelivery from '../../assets/FreeDelivery.jpg'
import Orginal from '../../assets/Orginal.jpg'

const Garanty = () => {
    return (

        <div className={styles.container}>
            <img src={ThreeHour} alt="ساعت مردانه" />
            <img src={Zemanat} alt="ساعت زنانه" />
            <img src={FiveYear} alt="ساعت ست" />
            <img src={FreeDelivery} alt="ساعت مردانه" />
            <img src={Orginal} alt="ساعت زنانه" />
        </div>

    )
}

export default Garanty