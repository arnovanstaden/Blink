import { Link } from "react-router-dom";
import ClassNames from "classnames";

// MUI
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

// Styles
import styles from "./fab.module.scss";

const FAB = ({ children, tooltip, onClick, link, left }) => {

    const classes = ClassNames(
        styles.fab,
        left ? styles.left : null
    )

    const Button = () => {
        return (
            <div className={classes} onClick={onClick ? onClick : null}>
                <Tooltip title={tooltip}>
                    <Fab className={styles.button}>
                        {children}
                    </Fab>
                </Tooltip>
            </div>
        )
    }

    if (link) {
        return (
            <Link to={link}>
                <Button />
            </Link>
        )
    }

    return <Button />
}

export default FAB
