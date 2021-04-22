import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getDeck } from "../../utils/decks";


// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Library/Page/Page";
import BackButton from "../UI/Library/BackButton/BackButton";

// MUI


// Styles
import styles from "./learn.module.scss"

const Learn = () => {
    // Config
    const history = useHistory()
    const { id } = useParams();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [deck, setDeck] = useState(undefined);
    const [cards, setCards] = useState(undefined);

    // Hooks
    useEffect(() => {
        if (!deck) {
            showLoader("Fetching Cards");
            getDeck(id)
                .then(result => {
                    setDeck(result.deck);
                    setCards(result.cards);
                })
        } else {
            hideLoader()
        }
    }, [deck]);

    if (deck) {
        return (
            <Page className={styles.learn}>
                <div className={styles.intro}>
                    <BackButton onClick={() => history.goBack()} />
                    <h1>{deck.name}</h1>
                </div>
            </Page>
        )
    }

    return null
}

export default Learn
