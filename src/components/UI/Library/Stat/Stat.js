import React from 'react';

import styles from "./stat.module.scss"

const Stat = ({ data }) => {
    return (
        <div className={styles.stat}>
            <h4>{data.number}</h4>
            <p>{data.text}</p>
        </div>
    )
}

export default Stat
