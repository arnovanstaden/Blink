import { useState } from "react";
import { deleteFlashcard } from "../../../utils/flashcards";
import { useSnackbar } from 'notistack';

// Components
import Paper from "../../UI/Library/Paper/Paper";
import FlashcardManage from "../../Flashcards/Manage/Manage";
import SlideUp from "../../UI/Library/Animations/SlideUp";
import MoreMenu from "../../UI/Library/MoreMenu/MoreMenu";


import styles from "./card.module.scss"

const Flashcard = ({ card, deleteCard, editCard }) => {
    // Config
    const { enqueueSnackbar } = useSnackbar();

    // State
    const [anchorEl, setAnchorEl] = useState(null);
    const [showCardEdit, setShowCardEdit] = useState(false);
    const [showBack, setShowBack] = useState(false)

    // Handlers
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleShowBackToggle = () => {
        setShowBack(prev => !prev);
    }

    const handleEditCardToggle = () => {
        setShowCardEdit(prev => !prev);
        handleClose()
    }

    const handleDelete = () => {
        deleteFlashcard(card)
            .then(result => {
                deleteCard(card)
                enqueueSnackbar(result.message, {
                    variant: 'success',
                });
            })
            .catch(err => {
                enqueueSnackbar(err.message, {
                    variant: 'error',
                });
                console.log(err)
            })
        handleClose()
    }

    return (
        <div className={styles.card} onClick={handleShowBackToggle}>
            <Paper>
                <div className={styles.options}>
                    <MoreMenu
                        menuItems={[
                            {
                                text: "Edit FlashCard",
                                click: handleEditCardToggle
                            },
                            {
                                text: "Delete FlashCard",
                                click: handleDelete
                            }
                        ]}
                    />
                </div>
                <div className={styles.content}>
                    <h3>{card.front}</h3>
                    <div className={`${showBack ? styles.showBack : null} ${styles.back}`}>
                        <p>{card.back}</p>
                    </div>
                </div>
            </Paper>

            <SlideUp show={showCardEdit}>
                <FlashcardManage card={card} deck_id={card.deck_id} toggle={handleEditCardToggle} editCard={editCard} />
            </SlideUp>
        </div>
    )
}

export default Flashcard
