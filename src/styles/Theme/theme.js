import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#307dfe",
        },
        secondary: {
            main: "#7a8d9c",
        },
    },
    typography: {
        fontFamily: [
            'Poppins',
            "sans-serif"
        ].join(',')
    }
});

