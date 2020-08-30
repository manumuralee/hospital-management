import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { patientActions } from '../actions';


class HomePage extends React.Component {
    componentDidMount() {
        this.props.getAllPatients();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deletePatient(id);
    }

    render() {
        const { user, patients } = this.props;
        console.log(patients);
        return (
            <div>
                <div className="container">
                    <div className="py-4">
                        <h2>Patient List</h2>
                        {patients.loading && <em>Loading patients...</em>}
                        {patients.error && <span className="text-danger">ERROR: {patients.error}</span>}
                        {patients.items && 
                        <table className="table border shadow">
                            <thead className="thead-dark">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Patient Name</th>
                                    <th scope="col">age</th>
                                    <th scope="col">Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients.items.map((patient, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{patient.firstName + ' ' + patient.surName}</td>
                                        <td>{patient.age}</td>
                                        <td>{patient.email}</td>
                                        <td>
                                            <Link className="btn btn-primary mr-2" to={`/patients/${patient.id}`}>View</Link>
                                            <Link className="btn btn-outline-primary mr-2" to={`/patients/edit/${patient.id}`}>Edit</Link>                                           
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>}
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { patients, authentication } = state;
    const { user } = authentication;
    return { user, patients };
}

const actionCreators = {
    getAllPatients: patientActions.getAllPatients,
    deletePatient: patientActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

