import { useContext, useRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory, Link } from "react-router-dom";

// Context
import { UserContext } from "../../context/UserContext"
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Library/Page/Page"
import Input from "../UI/Library/Input/Input";
import Button from "../UI/Library/Button/Button";
import Container from "@material-ui/core/Container";

// MUI
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

// Styles, Media
import styles from "./auth.module.scss";
import Logo from "../../assets/images/logos/logo-light.svg";

export default function SignIn() {

    // Config
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { signIn, currentUser } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef();
    const passwordRef = useRef();

    // Check Already SignedIn
    useEffect(() => {
        if (currentUser) {
            return history.push('/')
        }
    }, []);


    // Handlers
    const handleAuth = (e) => {
        showLoader()
        e.preventDefault();

        let form = document.getElementById("signin-form")

        // Validate
        if (form.checkValidity() === false) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // Data
        const authData = {
            email: emailRef.current.value.toLowerCase(),
            password: passwordRef.current.value,
        }

        signIn(authData)
            .then(result => {
                hideLoader();
                enqueueSnackbar(`Welcome back ${result.displayName}!`, {
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
            title="Sign In"
            center
        >
            <Container maxWidth="xs">
                <div className={styles.auth}>
                    <img src={Logo} alt="" />
                    <h1>Sign In</h1>
                    <form name="signin-form" id="signin-form">
                        <Grid container spacing={2}>
                            <TextField
                                margin="normal"
                                required
                                type="text"
                                label="Email"
                                inputRef={emailRef}
                                autoFocus
                                variant="outlined"
                                fullWidth />
                            <TextField
                                margin="normal"
                                required
                                type="password"
                                label="Password"
                                inputRef={passwordRef}
                                variant="outlined"
                                fullWidth />
                            <Button fullWidth onClick={handleAuth}>Sign In</Button>
                        </Grid>
                    </form>
                    <Grid container justify="space-between" className={styles.options}>
                        <Link to="/resetpassword">Reset Password</Link>
                        <Link to="/signup">Sign Up</Link>
                    </Grid>
                </div>
            </Container>
        </Page>
    )
}
