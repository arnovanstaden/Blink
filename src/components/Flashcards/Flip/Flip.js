import { useRef, useEffect } from 'react';

// Styles
import styles from "./flip.module.scss";

const Flip = ({ card }) => {

    const cardRef = useRef();
    const textRef = useRef();
    const contentRef = useRef()

    const flipToFront = () => {
        const cardElem = cardRef.current;
        if (cardElem.classList) {
            cardElem.classList.remove(styles.flip)
        }

    }

    // Handlers
    const handleFlipCard = () => {
        const cardElem = cardRef.current;
        cardElem.classList.toggle(styles.flip)
    }

    const handleKeyDown = (e) => {
        const key = e.key;

        if (key === "ArrowRight" || key === "ArrowLeft" || key === "Enter") {
            handleFlipCard()
        }
    }

    // Effects

    useEffect(() => {
        flipToFront();

        // Check Height
        const contentHeight = contentRef.current.offsetHeight;
        const textHeight = textRef.current.offsetHeight;

        if (textHeight > contentHeight) {
            document.querySelector(`.${styles.back}`).classList.add(styles.adjusted)
        } else {
            document.querySelector(`.${styles.back}`).classList.remove(styles.adjusted)
        }
    })

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);

        // cleanup this component
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    });

    return (
        <div className={styles.card} onClick={handleFlipCard} ref={cardRef}>
            <div className={styles.content} ref={contentRef}>
                <div className={styles.front}>
                    <p>{card.front}</p>
                </div>
                <div className={styles.back}>
                    <p ref={textRef}>{card.back}</p>
                </div>
            </div>
        </div>

    )
}

export default Flip
