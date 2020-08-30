import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';


class HospitalNavbar extends React.Component {

    render() {
        const { loggedIn } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                            <Navbar.Brand href="#home" className="p-4">Hospital Management</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    <Nav.Link href="/">{loggedIn ? 'Home' : 'Login'}</Nav.Link>
                                    {loggedIn && <Nav.Link href="/users">Users</Nav.Link>}
                                    {loggedIn && <Nav.Link href="/patients/add">Add Patient</Nav.Link>}
                                    {loggedIn && <Nav.Link href="/logout">Logout</Nav.Link>}
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                    </div>
                </div>
            </div>
        )
    }
}
function mapState(state) {
    const { loggedIn } = state.authentication;
    return { loggedIn };
}
export default connect(mapState)(HospitalNavbar);

