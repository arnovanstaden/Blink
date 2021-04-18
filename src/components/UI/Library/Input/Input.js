import React from 'react';
import ClassNames from "classnames"

// styles
import styles from "./input.module.scss"


const Input = (
    { type,
        label,
        placeholder,
        autoFocus,
        inputRef,
        value,
        onChange,
        center }
) => {

    const classes = ClassNames(
        styles.input,
        center ? styles.center : null
    )

    return (
        <div className={classes}>
            {type ? <label htmlFor="">{label}</label> : null}
            <input
                placeholder={placeholder}
                type={type}
                autoFocus={autoFocus}
                ref={inputRef}
                value={value}
                onChange={onChange ? () => onChange() : null}
            />
        </div>
    )
}

export default Input
