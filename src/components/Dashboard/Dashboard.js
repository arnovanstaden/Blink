import React from 'react';
import withAuth from "../HOC/withAuth"

// Components

// Styles
import styles from "./dashboard.module.scss";

const Dashboard = () => {
    return (
        <main className={styles.dashboard}>
            Dashboard
        </main>
    )
}


export default withAuth(Dashboard)