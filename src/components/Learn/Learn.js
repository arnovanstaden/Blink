import { useParams, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getDeck } from "../../utils/decks";
import { shuffleArray } from "../../utils/general";
import { getDeckCards } from "../../utils/flashcards";


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

// Custom Hooks
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Learn = () => {

    // Config
    const history = useHistory()
    const { id } = useParams();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState(undefined);
    const [position, setPosition] = useState(0);
    const [revise, setRevise] = useState(undefined);
    const [learnType] = useState(useQuery().get("type"))

    // Hooks
    useEffect(() => {
        if (!deck) {
            showLoader("Preparing Deck");
            getDeck(id)
                .then(result => {
                    setDeck(result);
                })
            getDeckCards(id)
                .then(result => {
                    if (learnType) {
                        // shuffle cards
                        const shuffledCards = shuffleArray(result)
                        setCards(shuffledCards)
                    } else {
                        setCards(result);
                    }
                    hideLoader()
                })
        } else {
            hideLoader()
        }
    }, [deck]);

    useEffect(() => {
        console.log(position)
    }, [position])

    // Handlers
    const handleLearnEnd = (newRevise) => {
        console.log(newRevise)
    }

    const handleFlip = () => {

    }

    const handleNextCard = (newRevise) => {
        if (position < cards.length - 1) {
            setPosition(prevPos => prevPos + 1)
        } else {
            handleLearnEnd(newRevise)
        }
    }

    const handleCorrect = () => {
        handleNextCard()
    }

    const handleWrong = () => {
        let newRevise;
        if (!revise) {
            newRevise = [cards[position]]
            setRevise(newRevise);
        } else {
            newRevise = [...revise, cards[position]]
            setRevise(newRevise);
        }
        // const newRevise = revise.push();
        // console.log(newRevise)
        // setRevise(newRevise)
        handleNextCard(newRevise)
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
