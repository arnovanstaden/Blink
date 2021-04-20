import { useContext, useState, useEffect } from "react";
import { getUserDecks } from "../../../utils/decks";
import { v4 as uuid } from "uuid";

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import DeckCard from "../Display/Card";

// MUI
import Grid from "@material-ui/core/Grid";

import styles from "./view.module.scss";

const View = () => {
    // Config
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [decks, setDecks] = useState(undefined);

    // Data
    useEffect(() => {
        if (!decks) {
            showLoader("Preparing Your Dashboard");
            getUserDecks()
                .then(result => {
                    setDecks(result)
                })
        } else {
            hideLoader()
        }
    }, [decks])

    return (
        <div className="view">
            <div className="heading">
                <h2>Your Decks</h2>
            </div>
            <Grid container spacing={3} className={styles.grid}>
                {decks && decks.map(deck => (
                    <DeckCard deck={deck} key={uuid()} />
                ))}

                {/* FIX THIS [No Decks] */}
            </Grid>
        </div>
    )
}



export default View
