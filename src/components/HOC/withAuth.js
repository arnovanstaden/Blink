import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { Redirect } from "react-router";

const withAuth = (WrappedComponent) => {

    return (props) => {
        const { currentUser } = useContext(UserContext);

        if (!currentUser) {
            return <Redirect to="/signin" />
        }

        return <WrappedComponent {...props} />;
    }
};

export default withAuth;