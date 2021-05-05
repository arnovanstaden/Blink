import { useRef, useState } from 'react';
import Slide from 'react-reveal/Slide';

// Components
import Paper from "../../UI/Library/Paper/Paper"

// Styles
import styles from "./flip.module.scss";

const Flip = ({ card }) => {

    const cardRef = useRef();

    const flipCard = () => {
        const cardElem = cardRef.current;
        cardElem.classList.toggle(styles.flip)
    }

    return (
        <Slide right spy={card} duration={500}>
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
        </Slide>
    )
}

export default Flip
