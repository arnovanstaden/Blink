import { SnackbarProvider } from 'notistack';
import withStyles from '@material-ui/core/styles/withStyles';

// Styles
const styles = {
    success: { backgroundColor: 'purple' },
};


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
