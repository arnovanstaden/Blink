import CardUI from "../../UI/Library/Card/Card";

import styles from "./card.module.scss"

const Flashcard = ({ card }) => {
    return (
        <CardUI>
            <div className={styles.card}>
                <p>{card.front}</p>
            </div>
        </CardUI>
    )
}

export default Flashcard
