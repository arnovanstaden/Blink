import { useContext } from 'react';
import { useSnackbar } from 'notistack';
import { Link } from "react-router-dom"

// Context
import { UserContext } from "../../../context/UserContext";

// MUi
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Container from "@material-ui/core/Container"


// Styles & Media
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
            <Container>
                <div className={styles.links}>
                    <Link to="/">
                        <div className={styles.logo}>
                            <img src={logo} alt="" />
                        </div>
                    </Link>
                    <button onClick={handleLogout}>
                        <ExitToAppIcon />
                        {/* <img src={dots} alt="" /> */}
                    </button>
                </div>
            </Container>
        </nav>
    )
}

export default Nav
