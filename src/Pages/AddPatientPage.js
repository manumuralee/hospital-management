import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { patientActions } from '../actions';
import BootstrapNavbar from '../BootstrapNavbar';

class AddPatientPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            patient: {
                id: '',
                gender: '',
                firstName: '',
                surName: '',
                age: '',
                meritialStatus: '',
                dob: '',
                emailAddress: '',
                phoneNumber: '',
                nationality: '',
                stateId: '',
                occupation: '',
                address: '',
                kinName: '',
                kinRelation: '',
                kinPhoneNumber: '',
                kinEmailAddress: '',
                kinOccupation: '',
                kinAddress: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { patient } = this.state;
        this.setState({
            patient: {
                ...patient,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { patient } = this.state;
        this.props.addPatient(patient);
    }

    render() {
        const { addingPatient } = this.props;
        const { patient, submitted } = this.state;
        return (            
            <div class="container">               
                <h2>Add Patient</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div class="messages"></div>
                    <div class="controls">
                        <div class="row">
                            <div class="col-sm-5">
                                <div className={'form-group'}>
                                </div>
                            </div>
                            <div class="col-sm-7">
                                <div className="form-group">
                                    <label htmlFor="id">Patient Id</label>
                                    <input type="text" className="form-control" name="id" value={patient.id} readOnly />                                   
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>

                        <div class="row">
                            <div class="col-sm-4">
                                <div className={'form-group' + (submitted && !patient.surName ? ' has-error' : '')}>
                                    <label htmlFor="surName">SurName</label>
                                    <input type="text" className="form-control" name="surName" value={patient.surName} onChange={this.handleChange} />
                                    {submitted && !patient.surName &&
                                        <div className="help-block">SurName is required</div>
                                    }
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div className={'form-group' + (submitted && !patient.firstName ? ' has-error' : '')}>
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" name="firstName" value={patient.firstName} onChange={this.handleChange} />
                                    {submitted && !patient.firstName &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div className={'form-group' + (submitted && !patient.gender ? ' has-error' : '')}>
                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" className="form-control" name="gender" value={patient.gender} onChange={this.handleChange} />
                                    {submitted && !patient.gender &&
                                        <div className="help-block">First Name is required</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>

                        <div class="row">
                            <div class="col-sm-4">
                                <div className={'form-group' + (submitted && !patient.age ? ' has-error' : '')}>
                                    <label htmlFor="age">Age</label>
                                    <input type="text" className="form-control" name="age" value={patient.age} onChange={this.handleChange} />
                                    {submitted && !patient.age &&
                                        <div className="help-block">Age is required</div>
                                    }
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div className={'form-group' + (submitted && !patient.meritialStatus ? ' has-error' : '')}>
                                    <label htmlFor="meritialStatus">First Name</label>
                                    <input type="text" className="form-control" name="meritialStatus" value={patient.meritialStatus} onChange={this.handleChange} />
                                    {submitted && !patient.meritialStatus &&
                                        <div className="help-block">Meritial Status is required</div>
                                    }
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div className={'form-group' + (submitted && !patient.dob ? ' has-error' : '')}>
                                    <label htmlFor="dob">Date of Birth</label>
                                    <input type="text" className="form-control" name="dob" value={patient.dob} onChange={this.handleChange} />
                                    {submitted && !patient.dob &&
                                        <div className="help-block">Date of Birth is required</div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div class="clearfix"></div>

                        <div class="row">
                            <div class="col-sm-4">
                                <div className="form-group"></div>
                            </div>
                            <div class="col-sm-4">
                                <div className="form-group">
                                    <button className="btn btn-primary">Submit</button>
                                    {addingPatient &&
                                        <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                    }
                                    <Link to="/" className="btn btn-link">Cancel</Link>
                                </div>
                            </div>
                            <div class="col-sm-4">
                                <div className="form-group"> </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { addingPatient } = state.registration;
    return { addingPatient };
}

const actionCreators = {
    addPatient: patientActions.addPatient
}

const connectedAddPatientPage = connect(mapState, actionCreators)(AddPatientPage);
export { connectedAddPatientPage as AddPatientPage };