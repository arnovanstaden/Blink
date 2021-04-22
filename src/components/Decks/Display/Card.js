import React from 'react';
import { Link } from "react-router-dom"

// Components
import Paper from "../../UI/Library/Paper/Paper";

// MUI
import Grid from "@material-ui/core/Grid";

// Styles
import styles from "./card.module.scss";

const DeckCard = ({ deck }) => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Link to={`/decks/${deck.id}`}>
                <Paper>
                    <div className={styles.card}>
                        <div className={styles.top}>
                            <p className={styles.category}>{deck.category}</p>
                            <p className={styles.count}>{deck.cardCount} Cards</p>
                        </div>
                        <p className={styles.name}>{deck.name}</p>
                        <small>{deck.description}</small>
                    </div>
                </Paper>
            </Link>
        </Grid>
    )
}

export default DeckCard
