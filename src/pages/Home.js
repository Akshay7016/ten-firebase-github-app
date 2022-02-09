import React, { useState, useContext } from "react";
import axios from "axios";

import {
    Row,
    Container,
    Col,
    Input,
    Button,
    InputGroup,
    InputGroupAddon
} from "reactstrap"

import UserCard from "../component/UserCard";
import Repos from "../component/Repos";
import { Redirect } from "react-router-dom";
import { UserContext } from "../context/UserContext"
import { toast } from "react-toastify";

const Home = () => {
    const context = useContext(UserContext);
    // To store search box input
    const [query, setQuery] = useState("");

    // To store github profile/user details
    const [user, setUser] = useState(null);

    const fetchDetails = async () => {
        try {
            const { data } = await axios.get(`https://api.github.com/users/${query}`);
            setUser(data);

            console.log({ data });
        } catch (error) {
            toast("Not able to find user", { type: "error" })
        }
    }


    // Put anypage behind login
    // If context.user (i.e logged in user) not present then show login page && if user is logged-in then show content of return()
    if ( ! context.user?.uid ) {
        return <Redirect to="/signin" />
    }

    return (
        <Container>
            <Row className="mt-3">
                <Col md="5">
                    <InputGroup>
                        <Input
                            type="text"
                            value={query}
                            onChange={event => setQuery(event.target.value)}
                            placeHolder="Please provide the username"
                        />

                        <InputGroupAddon addonType="append">
                            <Button onClick={fetchDetails} color="primary">
                                Fetch User
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>

                    {/* If we get user(line 26) then show UserCard */}
                    {user ? <UserCard user={user} /> : null}
                </Col>

                <Col md="7">
                    {/* If we get user(line 26) then show Repos && user object has repos_url property which contains repository url*/}
                    {user ? <Repos repos_url={user.repos_url} /> : null}
                </Col>
            </Row>
        </Container>
    )
}

export default Home;