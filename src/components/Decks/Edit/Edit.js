import { useState, useContext, useEffect } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import { useParams } from 'react-router-dom';
import { getDeck } from "../../../utils/decks";
import { v4 as uuid } from "uuid";

// Components
// import FAB from "../../UI/Library/FAB/FAB";
import Flashcard from "../../Flashcards/Display/Card"
import FlashcardCreate from "../../Flashcards/Create/Create";
import SlideUp from "../../UI/Library/Animations/SlideUp";

// MUI
import FAB from "@material-ui/core/Fab"

// Icons
import AddIcon from "@material-ui/icons/Add"

// Styles
import styles from "./edit.module.scss";

const Edit = () => {
    // Config
    const { id } = useParams();
    const [tabOption, setTabOption] = useState("Cards");
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState(undefined);
    const [showFlashcardCreate, setShowFlashcardCreate] = useState(true);

    // Data
    useEffect(() => {
        if (!deck) {
            showLoader("Fetching Deck");
            getDeck(id)
                .then(result => {
                    setDeck(result.deck);
                    setCards(result.cards);
                })
        } else {
            hideLoader()
        }
    }, [deck]);

    // Handler
    const handleShow = () => {
        setShowFlashcardCreate(true)
    }


    // Subcomponents
    const Menu = () => {

        // Handlers
        const handleTabChange = (e) => {
            setTabOption(e.target.innerText);
        }

        return (
            <div className={styles.menu}>
                <button className={tabOption === "Cards" ? styles.active : null} onClick={handleTabChange}>Cards</button>
                <button className={tabOption === "About" ? styles.active : null} onClick={handleTabChange}>About</button>
            </div>
        )
    }

    const About = () => {
        return (
            <div className={styles.about}>
                <h5>Description</h5>
                <p>{deck.description}</p>
            </div>
        )
    }

    const Cards = () => {
        return (
            <>
                {cards.map(card => (
                    <Flashcard card={card} key={uuid()} />
                ))}
            </>
        )
    }

    if (deck) {
        return (
            <div className={styles.edit}>
                <div className={styles.intro}>
                    <p>{deck.category}</p>
                    <h1>{deck.name}</h1>
                    <Menu />
                </div>

                {tabOption === "Cards" ?
                    cards ? <Cards /> : null
                    : <About />}

                <FAB
                    className="fab"
                    tooltip="Create New Flashcard"
                    onClick={handleShow}
                >
                    <AddIcon />
                </FAB>

                <SlideUp show={showFlashcardCreate}>
                    <FlashcardCreate deckid={deck.id} show={setShowFlashcardCreate} />
                </SlideUp>
            </div>
        )
    }

    return null
}

export default Edit
