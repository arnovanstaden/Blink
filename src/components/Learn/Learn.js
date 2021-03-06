import { useParams, useHistory, useLocation } from "react-router-dom";
import { useState, useEffect, useContext, useRef } from "react";
import { getDeck, saveProgress, giveUp } from "../../utils/decks";
import { shuffleArray, getPercentage } from "../../utils/general";
import { saveLearnProgress, getLearnProgress, deleteLearnProgress } from "../../utils/learn";
import { getDeckCards } from "../../utils/flashcards";
import Slide from 'react-reveal/Slide';
import { useSnackbar } from 'notistack';
import ClassNames from "classnames";
import {
    isMobile
} from "react-device-detect";
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

// Icons
import FullscreenIcon from '@material-ui/icons/Fullscreen';
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
    const history = useHistory();
    const introRef = useRef()
    const { id } = useParams();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const { enqueueSnackbar } = useSnackbar();

    // State
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState(undefined);
    const [position, setPosition] = useState(0);
    const [revise, setRevise] = useState([]);
    const [end, setEnd] = useState(false);
    const [learnType] = useState(useQuery().get("type"))

    // Hooks

    // Get Data
    useEffect(() => {
        if (!deck) {
            showLoader("Preparing Deck");
            getDeck(id)
                .then(result => {
                    setDeck(result);
                })
            // Check For Progress
            const progress = getLearnProgress()
            if (progress) {
                setEnd(progress.end)
                setCards(progress.cards);
                setPosition(progress.position);
                setRevise(progress.revise)
            }
            else {
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
            }
        } else {
            hideLoader()
        }
    }, [deck]);

    const handleNextCard = (newRevise) => {
        let newPos = position;
        const progress = {
            position: position,
            revise: newRevise ? newRevise : revise,
            cards: cards,
            end: false
        }
        if (position < cards.length - 1) {
            newPos += 1;
            setPosition(newPos);
            progress.position = newPos;
            saveLearnProgress(progress)
        } else {
            setEnd(true);
            progress.end = true
            saveLearnProgress(progress)
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
        setEnd(false)
        showLoader("Saving Progress")
        saveProgress(deck).then((result) => {
            hideLoader();
            deleteLearnProgress()
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
                deleteLearnProgress()
                enqueueSnackbar(result.message, {
                    variant: 'success',
                });
                history.goBack()
            })
    }

    const handleFullScreen = () => {
        introRef.current.classList.toggle(styles.hide)
    }

    // Styles
    const introStyles = ClassNames(
        styles.intro,
        isMobile ? styles.mobile : null
    )

    // Render

    if (deck) {
        return (
            <Page className={styles.learn}>
                <div className={introStyles} ref={introRef}>
                    <Container>
                        <div className={styles.top}>
                            <BackButton onClick={() => history.goBack()} />
                            <p>{position + 1}/{deck.cardCount}</p>
                        </div>
                        <h1>{deck.name}</h1>
                    </Container>
                </div>

                <Container>
                    <div className={styles.fullscreen}>
                        <FullscreenIcon onClick={handleFullScreen} />
                    </div>
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
