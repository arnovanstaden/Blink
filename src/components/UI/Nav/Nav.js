import { useContext } from 'react';
import { useSnackbar } from 'notistack';

// Context
import { UserContext } from "../../../context/UserContext";

// Styles
import styles from "./nav.module.scss"
import logo from "../../../assets/images/logos/logo-light.svg";

const Nav = () => {

    // Config
    const { signOut } = useContext(UserContext);
    const { enqueueSnackbar } = useSnackbar();
    const { currentUser } = useContext(UserContext);

    // Render null if no auth
    if (!currentUser) {
        return null
    }


    // Handlers
    const handleLogout = () => {
        signOut()
            .then(() => {
                enqueueSnackbar('Logout Successful', {
                    variant: 'success',
                });
            })
            .catch(err => console.log(err))
    }

    return (
        <nav className={styles.nav}>
            <div className={styles.logo}>
                <img src={logo} alt="" />
            </div>
            <button onClick={handleLogout}>Logout</button>
        </nav>
    )
}

export default Nav
