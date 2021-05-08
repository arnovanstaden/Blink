import { useRef, useEffect } from 'react';

// Styles
import styles from "./flip.module.scss";

const Flip = ({ card }) => {

    const cardRef = useRef();

    const flipCard = () => {
        const cardElem = cardRef.current;
        cardElem.classList.toggle(styles.flip)
    }

    const flipToFront = () => {
        const cardElem = cardRef.current;
        if (cardElem.classList) {
            cardElem.classList.remove(styles.flip)
        }
    }

    useEffect(() => {
        flipToFront()
    })

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
