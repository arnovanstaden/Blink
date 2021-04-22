// Components
import Paper from "../../UI/Library/Paper/Paper";

// MUI
import MoreVertIcon from '@material-ui/icons/MoreVert';

import styles from "./card.module.scss"

const Flashcard = ({ card }) => {
    return (
        <div className={styles.card}>
            <Paper>
                <div className={styles.options}>
                    <MoreVertIcon />
                </div>
                <div className={styles.card}>
                    <p>{card.front}</p>
                </div>
            </Paper>
        </div>
    )
}

export default Flashcard
