import React, { useState } from 'react';
import { Navbar, Nav, Form, FormControl, Spinner } from 'react-bootstrap';
import { Outlet, Link } from "react-router-dom";

function NavbarCustom({ onSearch }) {
    const handleSearchChange = (event) => {
        onSearch(event.target.value);
    };

    const userId = sessionStorage.getItem('id');

    function onLogOut(){
        sessionStorage.clear();
        window.location.assign('/lugares');
    }

    return (
        <><Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Cazadores de la Historia</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link>
                        <Link class='link-router' to="/">Inicio</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link class='link-router' to="/lugares">Lugares</Link>
                    </Nav.Link>
                    <Nav.Link>
                        <Link class='link-router' to="/objetos">Objetos</Link>
                    </Nav.Link>
                    {userId ? <Nav.Link>
                        <Link class='link-router' to={"/usuario/" + userId}>Mi perfil</Link>
                    </Nav.Link> :
                    <Nav.Link>
                    <Link class='link-router' to="/login">Login</Link>
                </Nav.Link>}
                {userId && <Nav.Link onClick={onLogOut}>Log Out
                    </Nav.Link>}
                </Nav>
                <Form inline>
                    <FormControl
                        type="search"
                        placeholder="Buscar"
                        className="mr-sm-2"
                        onChange={handleSearchChange} />
                </Form>
            </Navbar.Collapse>
        </Navbar>
            <Outlet />
        </>

    );
}

export default NavbarCustom;
