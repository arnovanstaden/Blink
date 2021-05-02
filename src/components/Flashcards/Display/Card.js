import { useState, useContext } from "react";
import { deleteFlashcard } from "../../../utils/flashcards";
import { useSnackbar } from 'notistack';

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import Paper from "../../UI/Library/Paper/Paper";
import FlashcardManage from "../../Flashcards/Manage/Manage";
import SlideUp from "../../UI/Library/Animations/SlideUp";

// MUI
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu"
import MenuItem from '@material-ui/core/MenuItem';

import styles from "./card.module.scss"

const Flashcard = ({ card }) => {
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
                enqueueSnackbar(result.message, {
                    variant: 'success',
                });
                hideLoader();
            })
            .catch(err => {
                hideLoader();
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
                    <MoreVertIcon onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleEditCardToggle}>Edit FlashCard</MenuItem>
                        <MenuItem onClick={handleDelete}>Delete FlashCard</MenuItem>
                    </Menu>
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
