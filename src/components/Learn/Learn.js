import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getDeck } from "../../utils/decks";


// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Library/Page/Page";
import BackButton from "../UI/Library/BackButton/BackButton";
import FAB from "../UI/Library/FAB/FAB";
import Card from "../Flashcards/Flip/Flip"

// MUI
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';

// Styles
import styles from "./learn.module.scss"

const Learn = () => {
    // Config
    const history = useHistory()
    const { id } = useParams();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState(undefined);
    const [position, setPosition] = useState(0);
    const [revise, setRevise] = useState([])

    // Hooks
    useEffect(() => {
        if (!deck) {
            showLoader("Fetching Cards");
            getDeck(id)
                .then(result => {
                    setDeck(result.deck);
                    setCards(result.cards);
                })
        } else {
            hideLoader()
        }
    }, [deck]);


    // Handlers
    const handleFlip = () => {

    }

    const handleCorrect = () => {

    }

    const handleWrong = () => {

    }

    if (deck) {
        return (
            <Page className={styles.learn}>
                <div className={styles.intro}>
                    <Container>
                        <div className={styles.top}>
                            <BackButton onClick={() => history.goBack()} />
                            <p>{position + 1}/{deck.cardCount}</p>
                        </div>
                        <h1>{deck.name}</h1>
                    </Container>
                </div>

                <Container>
                    <div className={styles.card}>
                        {cards ? <Card card={cards[position]} /> : null}
                    </div>
                </Container>


                <div className={styles.actions}>
                    <Grid container justify="center" spacing={2}>
                        <Grid item>
                            <FAB
                                tooltip="Wrong"
                                onClick={handleWrong}
                                bordered
                            >
                                <ClearIcon />
                            </FAB>
                        </Grid>
                        <Grid item>
                            <FAB
                                tooltip="Correct"
                                onClick={handleCorrect}
                            >
                                <CheckIcon />
                            </FAB>
                        </Grid>
                    </Grid>
                </div >
            </Page >
        )
    }

    return null
}

export default Learn
