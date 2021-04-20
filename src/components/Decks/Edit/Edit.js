import { useState, useContext, useEffect } from "react";
import { LoaderContext } from "../../../context/LoaderContext";
import { useParams } from 'react-router-dom';
import { getDeck } from "../../../utils/decks";
import { v4 as uuid } from "uuid";

// Components
import FAB from "../../UI/Library/FAB/FAB";
import FlashCard from "../../FlashCards/Display/Card"

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

    // Data
    useEffect(() => {
        if (!deck) {
            showLoader("Fetching Deck");
            getDeck(id)
                .then(result => {
                    setDeck(result.deck);
                    setCards(result.cards)
                })
        } else {
            hideLoader()
        }
    }, [deck]);



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
                    <FlashCard card={card} key={uuid()} />
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
                    tooltip="Manage Deck"
                >
                    <AddIcon />
                </FAB>

            </div>
        )
    }

    return null
}

export default Edit
