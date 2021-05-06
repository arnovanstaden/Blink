import { v4 as uuid } from "uuid";

// Components
import DeckCard from "../Display/Card";

// MUI
import Grid from "@material-ui/core/Grid";

import styles from "./list.module.scss";

const List = ({ decks }) => {


    return (
        <div className={styles.list}>
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



export default List
