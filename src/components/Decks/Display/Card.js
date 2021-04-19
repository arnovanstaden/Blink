import React from 'react';
import { Link } from "react-router-dom"

// MUI
import Grid from "@material-ui/core/Grid";

// Styles
import styles from "./card.module.scss";

const Card = ({ deck }) => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Link to={`/decks/${deck.id}`}>
                <div className={styles.card}>
                    <p className={styles.category}>{deck.category}</p>
                    <p className={styles.name}>{deck.name}</p>
                    <small>{deck.description}</small>
                </div>
            </Link>
        </Grid>
    )
}

export default Card
