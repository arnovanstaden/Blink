import { useState } from "react";

// Components
import Page from "../UI/Library/Page/Page";
import FAB from "../UI/Library/FAB/FAB";
import DecksView from "../Decks/View/View";
import Nav from "../UI/Nav/Nav"
import SlideUp from "../UI/Library/Animations/SlideUp";
import DeckCreate from "../Decks/Create/Create";

// Styles
import styles from "./dashboard.module.scss";

// Icons
import AddIcon from "@material-ui/icons/Add"

const Dashboard = () => {

    // State
    const [showDeckCreate, setShowDeckCreate] = useState(false);

    // Handler
    const handleDeckToggle = () => {
        setShowDeckCreate(prev => !prev)
    }

    return (
        <Page
            title="Dashboard"
            className={styles.dashboard}
        >
            <Nav />
            <main className={styles.dashboard}>
                <div className="heading">
                    <h1>Dashboard</h1>
                </div>
                <DecksView />
                <FAB
                    className="fab"
                    onClick={handleDeckToggle}
                    tooltip="Create New Deck"
                >
                    <AddIcon />
                </FAB>

                <SlideUp show={showDeckCreate}>
                    <DeckCreate toggle={handleDeckToggle} />
                </SlideUp>
            </main>
        </Page>
    )
}

export default Dashboard
