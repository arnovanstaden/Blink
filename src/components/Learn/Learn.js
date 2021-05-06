import { useParams, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getDeck, saveProgress, giveUp } from "../../utils/decks";
import { shuffleArray, getPercentage } from "../../utils/general";
import { getDeckCards } from "../../utils/flashcards";
import Slide from 'react-reveal/Slide';
import { useSnackbar } from 'notistack';

// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Library/Page/Page";
import BackButton from "../UI/Library/BackButton/BackButton";
import FAB from "../UI/Library/FAB/FAB";
import Card from "../Flashcards/Flip/Flip";
import Modal from "../UI/Modal/Modal";

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
    const { enqueueSnackbar } = useSnackbar();

    // State
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState(undefined);
    const [position, setPosition] = useState(0);
    const [revise, setRevise] = useState([]);
    const [end, setEnd] = useState(false)
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
        console.log("Game End");
        console.log(revise);
        console.log(cards);

    }, [end])


    const handleNextCard = (newRevise) => {
        if (position < cards.length - 1) {
            setPosition(prevPos => prevPos + 1)
        } else {
            setEnd(true)
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
        handleNextCard(newRevise)
    }

    const handleSaveProgress = () => {
        showLoader("Saving Progress")
        saveProgress(deck).then((result) => {
            hideLoader();
            enqueueSnackbar(result.message, {
                variant: 'success',
            });
            history.goBack()
        })
    }

    const handleRevise = () => {
        setEnd(false);
        setCards(revise);
        setRevise([]);
        setPosition(0)
    }

    const handleGiveUp = () => {
        const cardsStudied = cards.length - revise.length
        giveUp(deck, cardsStudied)
            .then((result) => {
                hideLoader();
                enqueueSnackbar(result.message, {
                    variant: 'success',
                });
                history.goBack()
            })
    }

    // Render

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
                    <Slide right spy={position} duration={400}>

                        <div className={styles.card}>
                            {cards ?
                                <Card card={cards[position]} />
                                : null}
                        </div>
                    </Slide>
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
                </div>

                <Modal status={end}
                    content={{
                        heading: revise.length > 0 ? "Almost There" : "All Done!",
                        text: revise.length > 0 ? `You got ${getPercentage(revise.length, cards.length)}%. Do you want to revise ${revise.length} card${revise.length > 1 ? "s" : ""}?` : "Well done! You have successfully learned 100% of the cards in this deck."
                    }}>
                    {revise.length > 0
                        ? <>
                            <button className="button button-alt"
                                onClick={handleGiveUp}
                            >Give Up</button>
                            <button className="button"
                                onClick={handleRevise}
                            >Revise ({revise.length})</button>
                        </>
                        : <button className="button"
                            onClick={handleSaveProgress}
                        >Save Progress</button>
                    }
                </Modal>
            </Page >
        )
    }

    return null
}

export default Learn
