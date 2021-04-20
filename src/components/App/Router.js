import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ResetPassword from "../Auth/ResetPassword";
import Dashboard from "../Dashboard/Dashboard";

import DeckEdit from "../Decks/Edit/Edit";

const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>

                {/* Auth */}
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/resetpassword">
                    <ResetPassword />
                </Route>

                {/* Decks */}
                <Route path="/decks/:id">
                    <DeckEdit />
                </Route>
                {/* <Route path="/learn/:id">
                    <DeckLearn />
                </Route> */}

            </Switch>
        </BrowserRouter>
    )
}

export default Router
