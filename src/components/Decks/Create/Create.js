import { useRef } from "react";

// Components
import Page from "../../UI/Library/Page/Page";
import Input from "../../UI/Library/Input/Input";
import Container from "@material-ui/core/Container";

// Styles
import styles from "./create.module.scss"

const Create = () => {

    // config
    const nameRef = useRef()
    return (
        <Page
            title="Create Deck"
            center
        >
            <Container maxWidth="xs">
                <div className={styles.create}>
                    Create Deck
                    <Input type="text" label="Deck Name" inputRef={nameRef} autoFocus center fullWidth />
                    <Input type="text" label="Description" inputRef={nameRef} autoFocus center fullWidth multiple />
                </div>
            </Container>

        </Page>
    )
}

export default Create
