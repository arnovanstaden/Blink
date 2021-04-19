import ClassNames from "classnames"

import styles from "./button.module.scss";

const Button = (
    {
        children,
        outline,
        fullWidth,
        onClick
    }
) => {

    const classes = ClassNames(
        styles.button,
        outline ? styles.outline : null,
        fullWidth ? styles.fullWidth : null
    )
    return (
        <button className={classes} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button
