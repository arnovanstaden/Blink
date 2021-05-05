import { v4 as uuid } from "uuid";
import { useState, useContext, useEffect } from "react";
import { useSnackbar } from 'notistack';
import { getDeckCards } from "../../../utils/flashcards";

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import Flashcard from "../Display/Card";
import FlashcardManage from "../../Flashcards/Manage/Manage";
import FAB from "../../UI/Library/FAB/FAB";
import SpeedDial from "../../UI/Library/SpeedDial/SpeedDial";
import SlideUp from "../../UI/Library/Animations/SlideUp";

// MUI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container"

// Icons
import AddIcon from "@material-ui/icons/Add"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ShuffleIcon from '@material-ui/icons/Shuffle';

// Styles
import styles from "./list.module.scss";

const List = ({ deck }) => {
    // Config

    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [cards, setCards] = useState(undefined);
    const [showFlashcardManage, setShowFlashcardManage] = useState(false);

    // Hooks
    useEffect(() => {
        if (!cards) {
            showLoader("Fetching Cards");
            getDeckCards(deck.id)
                .then(result => {
                    setCards(result);
                })
        } else {
            hideLoader()
        }
    }, [cards]);

    // Handler
    const handleCreateCardToggle = () => {
        setShowFlashcardManage(prev => !prev)
    }

    const handleAddNewCard = (newCard) => {
        const newCardsArray = [...cards, newCard]
        setCards(newCardsArray)
    }

    const handleEditCard = (editCard) => {
        const oldCardPos = cards.findIndex(card => card.id === editCard.id);
        const newCardsArray = [...cards]
        newCardsArray[oldCardPos] = editCard
        setCards(newCardsArray)
    }

    const handleDeleteCard = (deleteCard) => {
        const newCardsArray = cards.filter(card => card.id !== deleteCard.id)
        setCards(newCardsArray)
    }

    if (cards) {
        return (
            <>
                {cards.length > 0 ?
                    <div className={styles.list}>
                        <Container>
                            <Grid container spacing={2}>
                                {cards.map(card => (
                                    <Grid item key={uuid()} xs={12}>
                                        <Flashcard card={card} editCard={handleEditCard} deleteCard={handleDeleteCard} />
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </div>
                    :  // FIX THIS
                    <p>You don't have any cards yet...</p>}


                <FAB
                    right
                    tooltip="Create New Flashcard"
                    onClick={handleCreateCardToggle}
                >
                    <AddIcon />
                </FAB>

                {/* {cards.length > 0 ?
                    <FAB
                        tooltip="Learn"
                        left
                        link={`/learn/${deck.id}`}
                    >
                        <PlayArrowIcon />
                    </FAB>
                    : null} */}


                <SpeedDial
                    left
                    actions={[
                        {
                            icon: <PlayArrowIcon />,
                            name: 'Learn',
                            link: `/learn/${deck.id}`
                        },
                        {
                            icon: <ShuffleIcon />,
                            name: 'Shuffle Learn',
                            link: `/learn/${deck.id}?shuffle`
                        }
                    ]}
                />

                <SlideUp show={showFlashcardManage}>
                    <FlashcardManage create deck_id={deck.id} toggle={handleCreateCardToggle} addCard={handleAddNewCard} />
                </SlideUp>
            </>
        )
    }

    return null
}



export default List
