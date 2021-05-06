import { useContext, useState, useEffect } from "react";
import { getTotalCardsStudied, getUserDecks } from "../../utils/decks"

// Context
import { LoaderContext } from "../../context/LoaderContext";

// Components
import Page from "../UI/Library/Page/Page";
import FAB from "../UI/Library/FAB/FAB";
import DecksList from "../Decks/List/List";
import Nav from "../UI/Nav/Nav"
import SlideUp from "../UI/Library/Animations/SlideUp";
import DeckManage from "../Decks/Manage/Manage";
import Stat from "../UI/Library/Stat/Stat"

// MUI
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"

// Styles
import styles from "./dashboard.module.scss";

// Icons
import AddIcon from "@material-ui/icons/Add"

const Dashboard = () => {
    // Config
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // State
    const [showDeckCreate, setShowDeckCreate] = useState(false);
    const [decks, setDecks] = useState(undefined);

    // Data
    useEffect(() => {
        if (!decks) {
            showLoader("Preparing Your Dashboard");
            getUserDecks()
                .then(result => {
                    setDecks(result)
                })
        } else {
            hideLoader()
        }
    }, [decks])

    // Handlers
    const handleDeckToggle = () => {
        setShowDeckCreate(prev => !prev)
    }

    if (decks) {

        return (
            <Page
                title="Dashboard"
                className={styles.dashboard}
            >
                <Container>
                    <Nav />
                    <main className={styles.dashboard}>
                        <div className="heading">
                            <h1>Dashboard</h1>
                        </div>
                        <section className={styles.stats}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={3}>
                                    <Stat
                                        data={{
                                            number: decks.length,
                                            text: "Decks"
                                        }}
                                    />
                                </Grid>
                                <Grid item xs={6} md={3}>
                                    <Stat
                                        data={{
                                            number: getTotalCardsStudied(decks),
                                            text: "Cards Studied"
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </section>
                        <DecksList decks={decks} />
                        <FAB
                            right
                            onClick={handleDeckToggle}
                            tooltip="Create New Deck"
                        >
                            <AddIcon />
                        </FAB>

                        <SlideUp show={showDeckCreate}>
                            <DeckManage create toggle={handleDeckToggle} />
                        </SlideUp>

                    </main>
                </Container>
            </Page>
        )
    }

    return null

}

export default Dashboard
