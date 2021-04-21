import { useContext, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import Flashcard from "../Display/Card";

// MUI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container"

import styles from "./list.module.scss";

const List = ({ cards }) => {
    // Config
    const { showLoader, hideLoader } = useContext(LoaderContext);

    return (
        <div className={styles.list}>
            <Container>
                <Grid container spacing={2}>
                    {cards.map(card => (
                        <Grid item key={uuid()} xs={12}>
                            <Flashcard card={card} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    )
}



export default List
