import React, { useState } from "react";
import "./App.css";

// react-router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

// toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// firebase
import firebase from "firebase/compat/app"
import "firebase/compat/auth"

// components
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import PageNotFound from "./pages/PageNotFound";

import { UserContext } from "./context/UserContext"
import Footer from "./layout/Footer";
import Header from "./layout/Header";

import FirebaseConfig from "./config/FirebaseConfig";

// init firebase
firebase.initializeApp(FirebaseConfig);


const App = () => {
    const [user, setUser] = useState(null)

    return (
        <Router>
            <ToastContainer />
             <UserContext.Provider value={{ user, setUser }}>   {/* value is object */}
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/signin" component={Signin} />
                    <Route path="/signup" component={Signup} />
                    <Route exact path="*" component={PageNotFound} />
                </Switch>

                <Footer />
            </UserContext.Provider>
        </Router>
    )
}


export default App;