import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Components
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import ResetPassword from "../Auth/ResetPassword";
import Dashboard from "../Dashboard/Dashboard";


const Router = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <Dashboard />
                </Route>
                <Route path="/signin">
                    <SignIn />
                </Route>
                <Route path="/signup">
                    <SignUp />
                </Route>
                <Route path="/resetpassword">
                    <ResetPassword />
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default Router
