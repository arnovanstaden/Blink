import { createContext, useState } from "react";



export const LoaderContext = createContext(null);

export const LoaderProvider = ({ children }) => {

    // State
    const [show, setShow] = useState(false);

    const showLoader = () => {
        setShow(true)
    };

    const hideLoader = () => {
        setShow(false)
    };

    return (
        <LoaderContext.Provider
            value={{ showLoader, hideLoader }
            }>
            {show ? <h1>Loader</h1> : null}
            { children}
        </LoaderContext.Provider>
    );
}