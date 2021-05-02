import { useState, useContext, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { getDeck, deleteDeck } from "../../../utils/decks";
import { useSnackbar } from 'notistack';
import { useHistory } from "react-router-dom";

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import FAB from "../../UI/Library/FAB/FAB";
import DeckManage from "../Manage/Manage";
import FlashcardManage from "../../Flashcards/Manage/Manage";
import SlideUp from "../../UI/Library/Animations/SlideUp";
import Stat from "../../UI/Library/Stat/Stat";
import FlashcardList from "../../Flashcards/List/List";
import MoreMenu from "../../UI/Library/MoreMenu/MoreMenu";

// MUI
import Container from "@material-ui/core/Container"
import Grid from "@material-ui/core/Grid"

// Icons
import AddIcon from "@material-ui/icons/Add"
import EditIcon from "@material-ui/icons/Edit"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

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
    const [showFlashcardCreate, setShowFlashcardCreate] = useState(false);
    const [showDeckUpdate, setShowDeckUpdate] = useState(false);

    // Hooks
    useEffect(() => {
        if (!deck) {
            showLoader("Fetching Deck");
            getDeck(id)
                .then(result => {
                    setDeck(result.deck);
                    setCards(result.cards);
                })
        } else {
            hideLoader()
        }
    }, [deck]);

    // Handler
    const handleCreateCardToggle = () => {
        setShowFlashcardCreate(prev => !prev)
    }

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
                                    number: cards.length,
                                    text: "Cards in Deck"
                                }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Stat
                                data={{
                                    number: 15,
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
                    cards ?
                        <>
                            <FlashcardList cards={cards} />
                            <FAB
                                className="fab"
                                tooltip="Learn"
                                left={true}
                                link={`/learn/${deck.id}`}
                            >
                                <PlayArrowIcon />
                            </FAB>
                            <FAB
                                className="fab"
                                tooltip="Create New Flashcard"
                                onClick={handleCreateCardToggle}
                            >
                                <AddIcon />
                            </FAB>
                        </> :
                        // FIX THIS
                        <p>You don't have any cards yet...</p>
                    :
                    <>
                        <About />
                        <FAB
                            className="fab"
                            tooltip="Edit Deck"
                            onClick={handleUpdateDeckToggle}
                        >
                            <EditIcon />
                        </FAB>
                    </>
                }



                <SlideUp show={showFlashcardCreate}>
                    <FlashcardManage create deckid={deck.id} toggle={handleCreateCardToggle} />
                </SlideUp>

                <SlideUp show={showDeckUpdate}>
                    <DeckManage deck={deck} toggle={handleUpdateDeckToggle} />
                </SlideUp>

            </main>
        )
    }

    return null
}

export default View
