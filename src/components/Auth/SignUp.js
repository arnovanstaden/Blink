import React, { useContext, useRef, useEffect } from 'react';
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
        showLoader()
        e.preventDefault();

        let form = document.getElementById("signup-form");

        // Validate Form
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
            className={styles.auth}
        >
            <img src={Logo} alt="" />
            <h1>Sign Up</h1>
            <form name="signup-form" id="signup-form">
                <Input type="text" label="Username" inputRef={displayNameRef} autoFocus center />
                <Input type="email" label="Email" inputRef={emailRef} center />
                <Input type="password" label="Password" inputRef={passwordRef} center />
                <Button fullWidth onClick={handleAuth}>Sign Up</Button>
            </form>
            <div className={styles.options}>
                <Link to="/signin">Sign In</Link>
            </div>
        </Page>
    )
}
