import React from 'react';
import ClassNames from "classnames"

// MUI
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import styles from "./back-button.module.scss"

const BackButton = ({ onClick, topLeft }) => {

    const classes = ClassNames(
        styles.button,
        topLeft ? styles.topLeft : null
    )
    return (
        <div className={classes}>
            <button onClick={onClick}>
                <ChevronLeftIcon className={styles.icon} />
            </button>
        </div >
    )
}

export default BackButton
