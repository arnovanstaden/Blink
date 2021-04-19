import { useContext, useRef } from 'react';
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


export default function ResetPassword() {

    // Config
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const { resetPassword } = useContext(UserContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const emailRef = useRef();

    // Handlers
    const handlePasswordReset = (e) => {
        showLoader()

        if (!validateForm(e)) {
            hideLoader()
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        // Data
        const email = emailRef.current.value.toLowerCase();

        resetPassword(email)
            .then(data => {
                hideLoader()
                enqueueSnackbar(`Password Reset Link Sent!`, {
                    variant: 'success',
                });
                return history.push('/signin')
            })
            .catch(err => {
                hideLoader()
                return enqueueSnackbar("Error sending password reset link", {
                    variant: 'error',
                });
            })
    }


    return (
        <Page
            title="Reset Password"
            className={styles.auth}
            center
        >
            <Container maxWidth="xs">
                <div className={styles.auth}>
                    <img src={Logo} alt="" />
                    <div className="heading">
                        <h1>Reset Password</h1>
                    </div>
                    <form name="reset-password-form" id="reset-password-form">
                        <Grid container spacing={2}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                type="email"
                                label="Email"
                                inputRef={emailRef}
                                center
                                fullWidth />
                            <Button fullWidth onClick={handlePasswordReset}>Reset Password</Button>
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
