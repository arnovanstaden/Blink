import { SnackbarProvider } from 'notistack';

// Styles

export default function NotificationsProvider({ children }) {
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
