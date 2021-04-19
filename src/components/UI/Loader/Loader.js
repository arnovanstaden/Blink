// MUI
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./loader.module.scss"

const Loader = ({ text }) => {

    return (
        <div className={styles.loader}>
            <CircularProgress color="inherit" />
            <p>{text}...</p>
        </div>
    )
}

export default Loader
