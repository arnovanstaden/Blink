import { useState } from "react";

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
                                        number: 2,
                                        text: "Decks"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} md={3}>
                                <Stat
                                    data={{
                                        number: 60,
                                        text: "Cards Studied"
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </section>
                    <DecksList />
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

export default Dashboard
