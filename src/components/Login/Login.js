import React, { useState, useRef } from 'react';

// Styles, Media
import styles from "./login.module.scss";
import Logo from "../../assets/images/logos/logo-light.svg";

export default function Login({ onLoggin }) {
    const [register, setRegister] = useState(false);

    const idRef = useRef(null);


    // Handlers
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log()
        onLoggin(idRef.current.value)
    }

    return (
        <main className={styles.login}>
            <img src={Logo} alt="" />
            <h1>Login</h1>
            <form name="login">
                {/* {register
                    ? <div className={styles.group}>
                        <label htmlFor="">Full Name</label>
                        <input name="name" type="text" required/>
                    </div>
                    : null}
                <div className={styles.group}>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="email" required/>
                </div>
                <div className={styles.group}>
                    <label htmlFor="password">Password</label>
                    <input type="password" required/>
                </div>
                {!register
                    ? <div className={styles.buttons}>
                        <button type="submit" className="button" onClick={handleSubmit}>Login</button>
                        <p onClick={() => setRegister(true)}>Don't have an account yet?</p>
                    </div>
                    : <div className={styles.buttons}>
                        <button type="submit" className="button" onClick={handleSubmit}>Register</button>
                        <p onClick={() => setRegister(false)}>Already have an account?</p>
                    </div>
                } */}
                <div className={styles.group}>
                    <label htmlFor="">ID</label>
                    <input name="name" type="text" ref={idRef} required />
                </div>
                <div className={styles.buttons}>
                    <button type="submit" className="button" onClick={handleSubmit}>Login</button>
                    <p onClick={() => setRegister(true)}>Don't have an account yet?</p>
                </div>
            </form>

        </main>
    )
}
