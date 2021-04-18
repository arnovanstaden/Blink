import React from 'react';
import withAuth from "../HOC/withAuth"

// Components
import Page from "../Page/Page"

// Styles
import styles from "./dashboard.module.scss";

const Dashboard = () => {
    return (
        <Page
            title="Dashboard"
            className={styles.dashboard}
        >
            <main className={styles.dashboard}>
                Dashboard
            </main>
        </Page>
    )
}


export default withAuth(Dashboard)
