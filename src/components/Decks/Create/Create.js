import { useRef, useContext } from "react";
import { useSnackbar } from 'notistack';
import { validateForm } from "../../../utils/general"
import { createDeck } from "../../../utils/decks";
import { useHistory } from "react-router-dom";


// Context
import { UserContext } from "../../../context/UserContext"
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import Page from "../../UI/Library/Page/Page";
import Button from "../../UI/Library/Button/Button";

// MUI
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

// Styles
import styles from "./create.module.scss"

const Create = () => {

    // Config
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { currentUser } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const nameRef = useRef();
    const descriptionRef = useRef();

    // Handlers
    const handleCreate = (e) => {
        showLoader()
        if (!validateForm(e)) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        const data = {
            user: currentUser.uid,
            name: nameRef.current.value,
            description: descriptionRef.current.value
        }

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
    }


    return (
        <Page
            title="Create Deck"
            center
        >
            <Container maxWidth="xs">
                <div className={styles.create}>
                    <div className="heading center">
                        <h1>Create Deck</h1>
                    </div>
                    <form name="create-deck-form" id="create-deck-form">
                        <Grid container spacing={2}>
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Deck Name"
                                inputRef={nameRef}
                                autoFocus
                                variant="outlined"
                                fullWidth />
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Description"
                                inputRef={descriptionRef}
                                variant="outlined"
                                fullWidth
                                multiple
                                rows={4}
                            />
                            <Button fullWidth onClick={handleCreate}>Create Deck</Button>
                        </Grid>
                    </form>
                </div>
            </Container>

        </Page>
    )
}

export default Create
