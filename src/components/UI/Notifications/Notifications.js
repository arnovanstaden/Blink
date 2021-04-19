import { SnackbarProvider } from 'notistack';

const NotificationsProvider = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            {children}
        </SnackbarProvider>
    )
}

export default NotificationsProvider
