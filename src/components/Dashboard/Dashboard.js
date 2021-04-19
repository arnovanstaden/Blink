// Components
import Page from "../UI/Library/Page/Page";
import FAB from "../UI/Library/FAB/FAB"

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
            <main className={styles.dashboard}>
                Dashboard
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
