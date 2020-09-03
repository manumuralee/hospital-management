import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { connect } from 'react-redux';


class HospitalNavbar extends React.Component {

    render() {
        const { loggedIn, user } = this.props;
        return (
            <div>
                <div className="row">
                    <div className="col-md-12">
                        <Navbar bg="primary" variant="dark" expand="lg" sticky="top"  >
                            <Navbar.Brand href="#home" className="p-4">Hospital Management</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbarmd-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">{loggedIn ? 'Home' : 'Login'}</Nav.Link>
                                    {loggedIn && <Nav.Link href="/users">Users</Nav.Link>}
                                    {loggedIn && <Nav.Link href="/patients/add">Add Patient</Nav.Link>}
                                </Nav>
                                <Nav>
                                    {loggedIn && user && user[0] && <Nav.Link href="/">{user[0].firstName + ' ' + user[0].lastName}</Nav.Link>}
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
    const { authentication } = state;
    const { loggedIn, user } = authentication;
    return { loggedIn, user };
}
export default connect(mapState)(HospitalNavbar);

