import { v4 as uuid } from "uuid";
import { Slide } from "react-reveal"

// Components
import DeckCard from "../Display/Card";

// MUI
import Grid from "@material-ui/core/Grid";

import styles from "./list.module.scss";

const List = ({ decks }) => {


    return (
        <div className={styles.list}>
            {/* <div className="heading">
                <h2>Your Decks</h2>
            </div> */}
            <hr />
            <Slide up cascade duration={500}>

                <Grid container spacing={3} className={styles.grid}>
                    {decks && decks.map(deck => (
                        <DeckCard deck={deck} key={uuid()} />
                    ))}

                    {/* FIX THIS [No Decks] */}
                </Grid>
            </Slide>
        </div>
    )
}



export default List
