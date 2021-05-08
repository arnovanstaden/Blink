import { useState } from "react";
import ClassNames from "classnames";
import { useHistory } from "react-router-dom";

// MUI
import SpeedDialMUI from '@material-ui/lab/SpeedDial';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';

// Icons
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

// Styles 
import styles from "./speed-dial.module.scss"

const SpeedDial = ({ actions, left, right }) => {
    // Config
    const history = useHistory();

    // State
    const [open, setOpen] = useState(false);

    // Handlers
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLink = (link) => {
        history.push(link)
    }

    // Styles
    const classes = ClassNames(
        styles.dial,
        left ? styles.left : null,
        right ? styles.right : null,
    )

    return (
        <div className={classes}>
            <SpeedDialMUI
                ariaLabel="SpeedDial openIcon example"
                icon={<PlayArrowIcon />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
            >

                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        tooltipOpen
                        onClick={() => handleLink(action.link)}
                        tooltipPlacement="right"
                        classes={{
                            staticTooltipLabel: styles.tooltip,
                            fab: styles.fab
                        }}
                    />
                ))}

            </SpeedDialMUI>
        </div>
    )
}

export default SpeedDial
