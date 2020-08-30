import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../actions';


class UsersPage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users } = this.props;
        return (
            <div class="container">               
                <h2>Add Patient</h2>
                <div className="col-md-6 col-md-offset-3">
                    <h2>Hi {user.firstName}!</h2>                
                    <h3>All registered users:</h3>
                    {users.loading && <em>Loading users...</em>}
                    {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                    {users.items &&
                        <ul>
                            {users.items.map((user, index) =>
                                <li key={user.id}>
                                    {user.firstName + ' ' + user.lastName}
                                    {
                                        user.deleting ? <em> - Deleting...</em>
                                        : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                        : <span> - <a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                    }
                                </li>
                            )}
                        </ul>
                    }                
                </div>
                <Link to="/addPatient" className="btn btn-link">Add Patient</Link>
                <Link to="/login" className="btn btn-link">Logout</Link>
            </div>
        );
    }
}

function mapState(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return { user, users };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete
}

const connectedUsersPage = connect(mapState, actionCreators)(UsersPage);
export { connectedUsersPage as UsersPage };