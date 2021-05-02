import { useState, useContext } from "react";
import { deleteFlashcard } from "../../../utils/flashcards";
import { useSnackbar } from 'notistack';

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import Paper from "../../UI/Library/Paper/Paper";
import FlashcardManage from "../../Flashcards/Manage/Manage";
import SlideUp from "../../UI/Library/Animations/SlideUp";
import MoreMenu from "../../UI/Library/MoreMenu/MoreMenu";


import styles from "./card.module.scss"

const Flashcard = ({ card, deleteCard }) => {
    // Config
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [anchorEl, setAnchorEl] = useState(null);
    const [showCardEdit, setShowCardEdit] = useState(false);

    // Handlers
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
        <div className={styles.card}>
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
                <div className={styles.data}>
                    <h3>Front</h3>
                    <p>{card.front}</p>
                </div>
            </Paper>

            <SlideUp show={showCardEdit}>
                <FlashcardManage card={card} deckid={card.deckid} toggle={handleEditCardToggle} />
            </SlideUp>
        </div>
    )
}

export default Flashcard
