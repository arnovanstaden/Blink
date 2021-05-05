import { useRef } from 'react';
import Slide from 'react-reveal/Slide';

// Styles
import styles from "./flip.module.scss";

const Flip = ({ card }) => {

    const cardRef = useRef();

    const flipCard = () => {
        const cardElem = cardRef.current;
        cardElem.classList.toggle(styles.flip)
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
