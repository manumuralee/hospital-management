import React from 'react';
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
            <div className="container">
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
                            {users.items.map((userRow, index) => (
                                <tr key={userRow.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{userRow.firstName + ' ' + userRow.lastName}</td>
                                    <td>{userRow.username}</td>
                                    <td>
                                        {
                                            userRow.deleting ? <em> - Deleting...</em>
                                                : userRow.deleteError ? <span className="text-danger"> - ERROR: {userRow.deleteError}</span>
                                        : <span>{user && user[0] && user[0].username  !== userRow.username && <a onClick={this.handleDeleteUser(user.id)}>Delete</a>}</span>
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
