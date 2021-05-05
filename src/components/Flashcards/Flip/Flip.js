import { useRef } from 'react';

// Components
import Paper from "../../UI/Library/Paper/Paper"

// Styles
import styles from "./flip.module.scss";

const Flip = ({ card }) => {

    const cardRef = useRef();

    const flipCard = () => {
        const card = cardRef.current;
        card.classList.toggle(styles.flip)
    }

    return (
        <div className={styles.card} onClick={flipCard} ref={cardRef}>
            <div className={styles.content}>
                <div className={styles.front}>
                    <p>{card.front}</p>
                </div>
                <div className={styles.back}>
                    <p>{card.back}</p>
                </div>
            </div>
        </div>
    )
}

export default Flip
