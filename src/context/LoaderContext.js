import { createContext, useState } from "react";
import Loader from "../components/UI/Loader/Loader";

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
            {show ? <Loader /> : null}
            { children}
        </LoaderContext.Provider>
    );
}