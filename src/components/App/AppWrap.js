import { UserProvider } from "../../context/UserContext";
import { LoaderProvider } from "../../context/LoaderContext";
import NotificationsProvider from "../../components/UI/Notifications/Notifications";
import Nav from "../../components/UI/Nav/Nav";


const AppWrap = ({ children }) => {
    return (
        <UserProvider>
            <LoaderProvider>
                <NotificationsProvider>
                    <Nav />
                    {children}
                </NotificationsProvider>
            </LoaderProvider>
        </UserProvider>
    )
}

export default AppWrap
