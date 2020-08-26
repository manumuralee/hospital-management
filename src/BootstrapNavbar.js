import React from 'react'

import { Navbar, Nav } from 'react-bootstrap'
import { HomePage, LoginPage, AddPatientPage } from './Pages';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class BootstrapNavbar extends React.Component {

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Router>
                            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                                <Navbar.Brand href="#home">Hospital Management</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="mr-auto">
                                        <Nav.Link href="/">Home</Nav.Link>
                                        <Nav.Link href="/addPatient">Add Patient</Nav.Link>
                                        <Nav.Link href="/logout">Logout</Nav.Link>
                                    </Nav>
                                </Navbar.Collapse>                                
                            </Navbar>
                            <br />
                            <Switch>
                                <Route exact path="/">
                                    <HomePage />
                                </Route>
                                <Route path="/addPatient">
                                    <AddPatientPage />
                                </Route>
                                <Route path="/logout">
                                    <LoginPage />
                                </Route>
                            </Switch>
                        </Router>
                    </div>
                </div>
            </div>
        )
    }
}

export default BootstrapNavbar;