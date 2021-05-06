import { useState } from 'react';

// MUI
import ModalMUI from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

// Styles
import styles from "./modal.module.scss"

const Modal = ({ status, content, children }) => {

    return (
        <div>
            <ModalMUI
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={styles.modal}
                open={status}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={status}>
                    <div className={styles.content}>
                        <h2>{content.heading}</h2>
                        <p>{content.text}</p>
                        <div className={styles.actions}>
                            {children}
                        </div>
                    </div>
                </Fade>
            </ModalMUI>
        </div>
    );
}

export default Modal