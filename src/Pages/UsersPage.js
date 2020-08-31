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
                <h2>All registered users</h2>
                {users.loading && <em>Loading users...</em>}
                {users.error && <span className="text-danger">ERROR: {users.error}</span>}
                {users.items &&

                    <table className="table border shadow">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User</th>
                                <th scope="col">User Name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.items.map((user, index) => (
                                <tr key={user.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{user.firstName + ' ' + user.lastName}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        {
                                            user.deleting ? <em> - Deleting...</em>
                                                : user.deleteError ? <span className="text-danger"> - ERROR: {user.deleteError}</span>
                                                    : <span><a onClick={this.handleDeleteUser(user.id)}>Delete</a></span>
                                        }
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>}

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