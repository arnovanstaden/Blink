import { v4 as uuid } from "uuid";
import { useState } from "react";
import { Slide } from "react-reveal"
import { useHistory } from "react-router-dom";

// Context

// Components
import Flashcard from "../Display/Card";
import FlashcardManage from "../../Flashcards/Manage/Manage";
import FAB from "../../UI/Library/FAB/FAB";
import SlideUp from "../../UI/Library/Animations/SlideUp";

// MUI
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container"

// Icons
import AddIcon from "@material-ui/icons/Add"

// Styles
import styles from "./list.module.scss";

const List = ({ deck, cards, setCards }) => {
    const history = useHistory();

    // State
    const [showFlashcardManage, setShowFlashcardManage] = useState(false);


    // Prevent Back Navigation for Better UX
    history.block((location, action) => {
        if (action === "POP") {
            setShowFlashcardManage()
            return false
        }
    })


    // Handler
    function handleCreateCardToggle() {
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
                            <Slide up cascade duration={500}>
                                <Grid container spacing={2} >
                                    {cards.map(card => (
                                        <Grid item key={uuid()} xs={12}>
                                            <Flashcard card={card} editCard={handleEditCard} deleteCard={handleDeleteCard} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Slide>
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

                <SlideUp show={showFlashcardManage}>
                    <FlashcardManage create deck_id={deck.id} toggle={handleCreateCardToggle} addCard={handleAddNewCard} />
                </SlideUp>
            </>
        )
    }

    return null
}



export default List
