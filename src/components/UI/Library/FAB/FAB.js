import { Link } from "react-router-dom";

// MUI
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

// Styles
import styles from "./fab.module.scss";

const FAB = ({ children, tooltip, onClick, link }) => {

    const Button = () => {
        return (
            <div className={styles.fab} onClick={onClick ? onClick : null}>
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
