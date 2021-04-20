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
import styles from "./create.module.scss"

const Create = ({ deckid, toggle }) => {

    // Config
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const frontRef = useRef();
    const backRef = useRef();

    // State

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
                        <h1>Create Flashcard</h1>
                    </div>
                    <form name="create-deck-form" id="create-deck-form">
                        <Grid container spacing={2}>
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Front"
                                inputRef={frontRef}
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
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4} />
                            <Button fullWidth onClick={handleCreate}>Create Flashcard</Button>
                        </Grid>
                    </form>
                </div>
            </Container>

        </FullScreen>
    )
}

export default Create
