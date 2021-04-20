// Components
import Page from "../UI/Library/Page/Page";
import FAB from "../UI/Library/FAB/FAB";
import DecksView from "../Decks/View/View";
import Nav from "../UI/Nav/Nav"

// Styles
import styles from "./dashboard.module.scss";

// Icons
import AddIcon from "@material-ui/icons/Add"

const Dashboard = () => {
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
                    link="/decks/create"
                    tooltip="Create New Deck"
                >
                    <AddIcon />
                </FAB>
            </main>
        </Page>
    )
}

export default Dashboard
