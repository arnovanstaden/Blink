import React, { useContext, useRef, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { Redirect } from "react-router";
import { useHistory } from "react-router-dom";

// Context
import { UserContext } from "../../../context/UserContext"
import { LoaderContext } from "../../../context/LoaderContext";

// Components
import Input from "../../UI/Library/Input/Input";
import Button from "../../UI/Library/Button/Button";

// Styles, Media
import styles from "./signin.module.scss";
import Logo from "../../../assets/images/logos/logo-light.svg";

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
            .then(data => {
                hideLoader();
                enqueueSnackbar(`Welcome back!`, {
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
        <main className={styles.signin}>
            <img src={Logo} alt="" />
            <h1>Sign In</h1>
            <form name="signin-form" id="signin-form">
                <Input type="text" label="Email" inputRef={emailRef} autoFocus center />
                <Input type="password" label="Password" inputRef={passwordRef} center />
                <Button fullWidth onClick={handleAuth}>Sign In</Button>
            </form>
        </main>
    )
}
