import { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getDeck, deleteDeck } from "../../../utils/decks";
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import DeckManage from "../Manage/Manage";
import SlideUp from "../../UI/Library/Animations/SlideUp";
import Stat from "../../UI/Library/Stat/Stat";
import FlashcardList from "../../Flashcards/List/List";
import MoreMenu from "../../UI/Library/MoreMenu/MoreMenu";

// MUI
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

// Styles
import styles from "./view.module.scss";

const View = () => {
    // Config
    const history = useHistory();

    const { enqueueSnackbar } = useSnackbar();
    const { id } = useParams();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [tabOption, setTabOption] = useState("Cards");
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState(undefined);
    const [showDeckUpdate, setShowDeckUpdate] = useState(false);

    // Hooks
    useEffect(() => {
        if (!deck) {
            showLoader("Fetching Deck");
            getDeck(id)
                .then(result => {
                    setDeck(result);
                })
        } else {
            hideLoader()
        }
    }, [deck]);

    //  Handlers
    const handleUpdateDeckToggle = () => {
        setShowDeckUpdate(prev => !prev)
    }

    const handleDeleteDeck = () => {
        deleteDeck(deck.id)
            .then(result => {
                enqueueSnackbar(result.message, {
                    variant: 'success',
                });
                history.push('/')
            })
            .catch(err => {
                enqueueSnackbar(err.message, {
                    variant: 'error',
                });
                console.log(err)
            })
    }

    // Subcomponents
    const Tabs = () => {

        // Handlers
        const handleTabChange = (e) => {
            setTabOption(e.target.innerText);
        }

        return (
            <div className={styles.tabs}>
                <button className={tabOption === "Cards" ? styles.active : null} onClick={handleTabChange}>Cards</button>
                <button className={tabOption === "About" ? styles.active : null} onClick={handleTabChange}>About</button>
            </div>
        )
    }

    const About = () => {
        return (
            <Container>
                <div className={styles.about}>
                    <h5>Description</h5>
                    <p>{deck.description}</p>
                    <Grid container className={styles.stats} spacing={2}>
                        <Grid item xs={6}>
                            <Stat
                                data={{
                                    number: deck.cardCount,
                                    text: "Cards in Deck"
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Stat
                                data={{
                                    number: deck.stats ? deck.stats.timesLearned : 0,
                                    text: "Times Studied"
                                }}
                            />
                        </Grid>

                    </Grid>
                </div>
            </Container>
        )
    }

    if (deck) {
        return (
            <main className={styles.view}>

                <div className={styles.intro}>
                    <p>{deck.category}</p>
                    <h1>{deck.name}</h1>
                    <Tabs />
                    <div className={styles.options}>
                        <MoreMenu
                            menuItems={[
                                {
                                    text: "Edit Deck",
                                    click: handleUpdateDeckToggle
                                },
                                {
                                    text: "Delete Deck",
                                    click: handleDeleteDeck
                                }
                            ]}
                        />
                    </div>
                </div>

                {tabOption === "Cards" ?
                    <FlashcardList deck={deck} />
                    :
                    <About />
                }

                <SlideUp show={showDeckUpdate}>
                    <DeckManage deck={deck} toggle={handleUpdateDeckToggle} />
                </SlideUp>

            </main>
        )
    }

    return null
}

export default View
