import { Link } from "react-router-dom";
import Fab from "@material-ui/core/Fab";
import Tooltip from "@material-ui/core/Tooltip";

// Styles
import styles from "./fab.module.scss";

const FAB = ({ children, link, tooltip }) => {

    const Button = () => {
        return (
            <div className={styles.fab}>
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
