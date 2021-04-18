import styles from "./loader.module.scss";

const Loader = () => {
    return (
        <div className={styles.loader}>
            <div className={styles.spinner}></div>
        </div>
    )
}

export default Loader
