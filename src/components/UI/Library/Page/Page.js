import ClassNames from "classnames";

// Components
import withAuth from "../../../HOC/withAuth"
import Container from "@material-ui/core/Container";

// Styles
import styles from "./page.module.scss"


const Page = ({ children, className, title, center }) => {

    const classes = ClassNames(
        className,
        styles.page,
        center ? styles.center : null
    )
    return (
        <main className={classes}>
            <Container>
                {children}
            </Container>
        </main>

    )
}

export default withAuth(Page);
