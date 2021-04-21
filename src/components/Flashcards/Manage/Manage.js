import { useRef, useContext } from 'react';
import { useSnackbar } from 'notistack';
import { validateForm } from "../../../utils/general"
import { createFlashcard } from "../../../utils/flashcards";

// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import FullScreen from "../../UI/Library/FullScreen/FullScreen";
import Button from "../../UI/Library/Button/Button";
import BackButton from "../../UI/Library/BackButton/BackButton";

// MUI
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// Styles
import styles from "./manage.module.scss"

const Create = ({ create, deckid, toggle, card }) => {

    // Config
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const frontRef = useRef();
    const backRef = useRef();

    // Manage Type
    const text = {
        title: create ? "Create" : "Edit",
        button: create ? "Create" : "Save",
        loader: create ? "Creating New Card" : "Updating Card",
    }

    // Handlers

    const handleCreate = (e) => {
        showLoader("Creating new Flashcard")
        if (!validateForm(e)) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        const data = {
            front: frontRef.current.value,
            back: backRef.current.value,
            deckid
        }

        createFlashcard(data)
            .then(result => {
                toggle()
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
    }

    return (
        <FullScreen
            center
        >
            <BackButton topLeft onClick={toggle} />
            <Container maxWidth="xs">
                <div className={styles.create}>
                    <div className="heading center">
                        <h1>{text.title} Flashcard</h1>
                    </div>
                    <form name="create-deck-form" id="create-deck-form">
                        <Grid container spacing={2}>
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Front"
                                inputRef={frontRef}
                                defaultValue={!create ? card.front : null}
                                autoFocus
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4} />
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Back"
                                inputRef={backRef}
                                defaultValue={!create ? card.back : null}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4} />
                            <Button fullWidth onClick={handleCreate}>{text.button} Flashcard</Button>
                        </Grid>
                    </form>
                </div>
            </Container>

        </FullScreen>
    )
}

export default Create
