import React, { useContext, useRef } from 'react';
import { useSnackbar } from 'notistack';
import { useHistory, Link } from "react-router-dom";

// Context
import { UserContext } from "../../context/UserContext"
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../Page/Page"
import Input from "../UI/Library/Input/Input";
import Button from "../UI/Library/Button/Button";

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
        e.preventDefault();

        let form = document.getElementById("reset-password-form");

        // Validate
        if (form.checkValidity() === false) {
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
        >
            <img src={Logo} alt="" />
            <h1>Reset Password</h1>
            <form name="reset-password-form" id="reset-password-form">
                <Input type="email" label="Email" inputRef={emailRef} center autoFocus />
                <Button fullWidth onClick={handlePasswordReset}>Reset Password</Button>
            </form>
            <div className={styles.options}>
                <Link to="/signin">Sign In</Link>
            </div>
        </Page>
    )
}
