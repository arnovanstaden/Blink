import ClassNames from "classnames";

// Components
import withAuth from "../../../HOC/withAuth"
import Container from "@material-ui/core/Container";
import { Helmet } from "react-helmet";

// Styles
import styles from "./page.module.scss"


const Page = ({ children, className, title, center }) => {

    const classes = ClassNames(
        className,
        styles.page,
        center ? styles.center : null
    )
    return (
        <Container>
            {/* <Helmet>
                <title>{title ? `${title} | Blink` : "Blink"}</title>
            </Helmet> */}
            <main className={classes}>
                {children}
            </main>
        </Container>
    )
}

export default withAuth(Page);
