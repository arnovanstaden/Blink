import ClassNames from "classnames"

// Styles
import styles from "./paper.module.scss";

const Paper = ({ children, className }) => {
    const classes = ClassNames(
        styles.paper,
        className ? className : null
    )
    return (
        <div className={classes}>
            {children}
        </div>
    )
}

export default Paper
