import ClassNames from "classnames";

// Components
import Container from "@material-ui/core/Container";

// Styles
import styles from "./fullscreen.module.scss"


const FullScreen = ({ children, center }) => {

    const classes = ClassNames(
        styles.fullscreen,
        center ? styles.center : null
    )
    return (
        <Container>
            <main className={classes}>
                {children}
            </main>
        </Container>
    )
}

export default (FullScreen);
