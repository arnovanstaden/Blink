import React from 'react';
import { UserProvider } from "../../context/UserContext";
import { LoaderProvider } from "../../context/LoaderContext";
import NotificationsProvider from "../../components/UI/Library/Notifications/Notifications";


const AppWrap = ({ children }) => {
    return (
        <UserProvider>
            <LoaderProvider>
                <NotificationsProvider>
                    {children}
                </NotificationsProvider>
            </LoaderProvider>
        </UserProvider>
    )
}

export default AppWrap
