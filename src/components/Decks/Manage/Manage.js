import { useRef, useContext, useState } from "react";
import { useSnackbar } from 'notistack';
import { validateForm } from "../../../utils/general"
import { createDeck, saveDeck } from "../../../utils/decks";
import { useHistory } from "react-router-dom";


// Context
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import Button from "../../UI/Library/Button/Button";
import FullScreen from "../../UI/Library/FullScreen/FullScreen";
import BackButton from "../../UI/Library/BackButton/BackButton";

// MUI
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import InputAdornment from "@material-ui/core/InputAdornment";

// Styles
import styles from "./manage.module.scss"

const Manage = ({ create, toggle, deck }) => {

    // Config
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const nameRef = useRef();
    const descriptionRef = useRef();
    const categoryRef = useRef();

    // State
    const [descLength, setDescLength] = useState(create ? 99 : deck.description.length);

    // Manage Type
    const text = {
        title: create ? "Create" : "Edit",
        button: create ? "Create" : "Save",
        loader: create ? "Creating New Deck" : "Updating Deck",
    }

    // Intercept Back Button


    // Handlers
    const handleDescChange = (event) => {
        const length = event.target.value.length
        setDescLength(length)
    }

    const handleSave = (e) => {
        showLoader(text.loader)
        if (!validateForm(e)) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        const data = {
            name: nameRef.current.value.trim(),
            category: categoryRef.current.value.trim(),
            description: descriptionRef.current.value.trim()
        }

        if (create) {
            createDeck(data)
                .then(result => {
                    history.push(`/decks/${result.id}`)
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
        } else {
            data.id = deck.id
            saveDeck(data)
                .then(result => {
                    //toggle()  Fix This - Hide + Show new data
                    history.go(0)
                    // history.push(`/decks/${result.id}`)
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


    }

    return (
        <FullScreen
            center
        >
            <BackButton topLeft onClick={toggle} />
            <Container maxWidth="xs">
                <div className={styles.create}>
                    <div className="heading center">
                        <h1>{text.title} Deck</h1>
                    </div>
                    <form name="create-deck-form" id="create-deck-form">
                        <Grid container spacing={2}>
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Deck Name"
                                inputRef={nameRef}
                                defaultValue={!create ? deck.name : null}
                                autoFocus
                                variant="outlined"
                                fullWidth />
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Category"
                                inputRef={categoryRef}
                                defaultValue={!create ? deck.category : null}
                                variant="outlined"
                                fullWidth />
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Description"
                                inputRef={descriptionRef}
                                defaultValue={!create ? deck.description : null}
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                inputProps={{
                                    maxLength: 99,
                                }}
                                onChange={handleDescChange}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            {99 - descLength}
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Button fullWidth onClick={handleSave}>{text.button} Deck</Button>
                        </Grid>
                    </form>
                </div>
            </Container>

        </FullScreen>
    )
}

export default Manage
