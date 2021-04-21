import { useContext, useRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory, Link } from "react-router-dom";
import { validateForm } from "../../utils/general"

// Context
import { UserContext } from "../../context/UserContext"
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Library/Page/Page"
import Button from "../UI/Library/Button/Button";
import Container from "@material-ui/core/Container";

// MUI
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

// Styles, Media
import styles from "./auth.module.scss";
import Logo from "../../assets/images/logos/logo-light.svg";

export default function SignUp() {

    // Config
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { signUp, currentUser } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef();
    const passwordRef = useRef();
    const displayNameRef = useRef();

    // Check Already SignedIn
    useEffect(() => {
        if (currentUser) {
            return history.push('/')
        }
    }, []);


    // Handlers
    const handleAuth = async (e) => {
        showLoader("Creating Your Profile")

        if (!validateForm(e)) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // Data
        const authData = {
            email: emailRef.current.value.toLowerCase(),
            password: passwordRef.current.value,
            displayName: displayNameRef.current.value,
        }

        // Password Length
        if (authData.password.length < 6) {
            hideLoader()
            return enqueueSnackbar("Your password needs to be at least 6 characters long.", {
                variant: 'error',
            });
        }

        signUp(authData)
            .then(result => {
                hideLoader();
                enqueueSnackbar(`Welcome to Blink ${result.displayName}!`, {
                    variant: 'success',
                });
                return history.push('/')
            })
            .catch(err => {
                hideLoader()
                return enqueueSnackbar(err.message, {
                    variant: 'error',
                });
            })
    }


    return (
        <Page
            title="Sign Up"
            center
        >
            <Container maxWidth="xs">
                <div className={styles.auth}>
                    <img src={Logo} alt="" />
                    <div className="heading">

                        <h1>Sign Up</h1>
                    </div>
                    <form name="signup-form" id="signup-form">
                        <Grid container spacing={2}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="text"
                                label="Username"
                                inputRef={displayNameRef} autoFocus
                                fullWidth />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="email"
                                label="Email"
                                inputRef={emailRef}
                                fullWidth />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="password"
                                label="Password"
                                inputRef={passwordRef}
                                fullWidth />
                            <Button fullWidth onClick={handleAuth}>Sign Up</Button>
                        </Grid>
                    </form>
                    <Grid container justify="center" className={styles.options}>
                        <Link to="/signin">Sign In</Link>
                    </Grid>
                </div>
            </Container>
        </Page>
    )
}
