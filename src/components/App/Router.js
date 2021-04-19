import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import Nav from "../UI/Nav/Nav"
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ResetPassword from "../Auth/ResetPassword";
import Dashboard from "../Dashboard/Dashboard";
import DeckView from "../Decks/View/View";
import DeckEdit from "../Decks/Edit/Edit";
import DeckCreate from "../Decks/Create/Create";


const Router = () => {
    return (
        <BrowserRouter>
            <Nav />
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
                <Route exact path="/decks/create">
                    <DeckCreate />
                </Route>
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
