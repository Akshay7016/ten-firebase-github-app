import React, { useState, useContext } from "react";

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
} from "reactstrap"

import { Link } from "react-router-dom"

import { UserContext } from "../context/UserContext"

const Header = () => {

    const context = useContext(UserContext);

    // For toggle menu
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Navbar color="info" light expand="md">
            <NavbarBrand>
                <Link to="/" className="text-white">
                    Akshay gitfire app
                </Link>
            </NavbarBrand>

            <NavbarText className="text-white">
                {context.user?.email ? context.user.email : ""}
            </NavbarText>

            <NavbarToggler onClick={toggle} />

            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>

                    {/* If user is logged in then show Logout option.
                    Else show signup and signin options  */}

                    {
                        context.user ? (
                            <NavItem>
                                <NavLink tag={Link} onClick={() => {context.setUser(null)}} className="text-white">
                                    Logout
                                </NavLink>
                            </NavItem>
                        ) : (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} to="/signup" className="text-white">
                                        Signup
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} to="/signin" className="text-white">
                                        Signin
                                    </NavLink>
                                </NavItem>
                            </>
                        )
                    }


                </Nav>
            </Collapse>
        </Navbar>
    )
}

export default Header;