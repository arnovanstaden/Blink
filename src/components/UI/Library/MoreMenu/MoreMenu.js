import { useState } from "react";

// MUI
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu"
import MenuItem from '@material-ui/core/MenuItem';

const MoreMenu = ({ menuItems }) => {

    // State
    const [anchorEl, setAnchorEl] = useState(null);

    // Handlers
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <MoreVertIcon onClick={handleClick} aria-controls="simple-menu" aria-haspopup="true" />
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {menuItems.map((item, index) => (
                    <MenuItem key={index} onClick={() => {
                        handleClose();
                        item.click();
                    }}>{item.text}</MenuItem>
                ))}
            </Menu>
        </>
    )
}

export default MoreMenu
