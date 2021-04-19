import { useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Redirect, useLocation } from "react-router";

const withAuth = (WrappedComponent) => {

    return (props) => {
        // Config
        const { currentUser } = useContext(UserContext);
        const [exception, setException] = useState(false)
        const location = useLocation().pathname;
        const exceptions = ["/signin", "404", "/signup", "/resetpassword"]

        if (!currentUser && !exceptions.includes(location)) {
            return <Redirect to="/signin" />
        }

        return <WrappedComponent {...props} />;
    }
};

export default withAuth;