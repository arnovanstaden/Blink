import React from 'react';

// Components
import Paper from "../../UI/Library/Paper/Paper"

// Styles
import styles from "./flip.module.scss";

const Flip = ({ card }) => {
    return (
        <Paper className={styles.card} >
            <div className={styles.content}>
                <p>{card.front}</p>
            </div>
        </Paper>
    )
}

export default Flip
