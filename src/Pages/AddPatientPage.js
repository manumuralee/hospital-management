import moment from "moment";
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { patientActions } from '../actions';


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
            submitted: false,
            mode: 'add',
            id: '',
            hasData: false,
            viewMode: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const mode = this.props.match.params.mode;
        const id = this.props.match.params.id;
        this.setState({ mode: mode, id: id });
        if (id && (mode === 'view' || mode === 'edit')) {
            this.props.getPatientById(id);
            if (mode === 'view') {
                this.setState({ viewMode: true });
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps && !prevState.hasData && nextProps.patient && nextProps.patient.hasData) {
            const { patient } = nextProps;
            return {
                patient: patient,
                hasData: true
            };
        }
        return null;
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { patient } = this.state;
        console.log(name, value);
        this.setState({
            patient: {
                ...patient,
                [name]: value
            }
        });
    }

    handleValidation() {
        let fields = this.state.patient;
        let formIsValid = true;

        //Name
        if (!fields.gender ||
            !fields.firstName ||
            !fields.surName ||
            !fields.age ||
            !fields.meritialStatus ||
            !fields.dob ||
            !fields.emailAddress ||
            !fields.phoneNumber ||
            !fields.nationality ||
            !fields.stateId ||
            !fields.occupation ||
            !fields.address ||
            !fields.kinName ||
            !fields.kinRelation ||
            !fields.kinPhoneNumber ||
            !fields.kinEmailAddress ||
            !fields.kinOccupation ||
            !fields.kinAddress) {
            formIsValid = false;
        }

        if (fields.emailAddress && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields.emailAddress)) {
            formIsValid = false;
        }

        if (fields.phoneNumber && fields.phoneNumber.length !== 10) {
            formIsValid = false;
        }

        if (fields.kinPhoneNumber && fields.kinPhoneNumber.length !== 10) {
            formIsValid = false;
        }

        if (fields.kinEmailAddress && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(fields.kinEmailAddress)) {
            formIsValid = false;
        }

        return formIsValid;
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        if (this.handleValidation()) {
            const { patient, mode } = this.state;
            if (mode && mode === 'edit') {
                this.props.editPatient(patient);
            } else {
                this.props.addPatient(patient);
                patient.id = 'P' + moment().format("YYYYMMDDhhmmss");
            }

        }
    }


    render() {
        const { addingPatient } = this.props;
        const { patient, submitted, mode, viewMode } = this.state;
        if (mode && mode === 'add') {
            patient.id = 'P' + moment().format("YYYYMMDDhhmmss");
        }
        return (
            <div>
                <div className="container">
                    <h2>{mode === 'edit' ? 'Edit Patient' : mode === 'view' ? 'View Patient' : 'Add Patient'}</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className="messages"></div>
                        <div className="controls">
                            <div className="row">
                                <div className="col-sm-5">
                                    <div className={'form-group'}>
                                    </div>
                                </div>
                                <div className="col-sm-7">
                                    <div className="form-group">
                                        <label htmlFor="id">Patient Id</label>
                                        <input type="text" className="form-control" name="id" value={patient.id} readOnly />
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.surName ? ' has-error' : '')}>
                                        <label htmlFor="surName">SurName</label>
                                        <input type="text" className="form-control" name="surName" value={patient.surName} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.surName &&
                                            <div className="help-block">SurName is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.firstName ? ' has-error' : '')}>
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className="form-control" name="firstName" value={patient.firstName} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.firstName &&
                                            <div className="help-block">First Name is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group pt-4' + (submitted && !patient.gender ? ' has-error' : '')}>
                                        <label htmlFor="gender">Gender</label>
                                        &nbsp;&nbsp;Female
                                                <input ref="input1" type="radio" name="gender" value='F' checked={patient.gender === 'F'} onChange={this.handleChange} disabled={this.state.viewMode} />
                                            &nbsp;&nbsp;Male
                                                <input ref="input2" type="radio" name="gender" value='M' checked={patient.gender === 'M'} onChange={this.handleChange} disabled={this.state.viewMode} />


                                        {submitted && !patient.gender &&
                                            <div className="help-block">Gender is required</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.age ? ' has-error' : '')}>
                                        <label htmlFor="age">Age</label>
                                        <input type="text" className="form-control" name="age" value={patient.age} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.age &&
                                            <div className="help-block">Age is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.meritialStatus ? ' has-error' : '')}>
                                        <label htmlFor="meritialStatus">Meritial Status</label>
                                        <select className="form-control" name="meritialStatus" value={patient.meritialStatus || ''} onChange={this.handleChange} disabled={this.state.viewMode} >
                                            <option value="">Select</option>
                                            <option value="Married">Married</option>
                                            <option value="Single">Single</option>
                                        </select>
                                        {submitted && !patient.meritialStatus &&
                                            <div className="help-block">Meritial Status is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.dob ? ' has-error' : '')}>
                                        <label htmlFor="dob">Date of Birth</label>
                                        <input type="date" className="form-control" name="dob" value={patient.dob} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.dob &&
                                            <div className="help-block">Date of Birth is required</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && (!patient.emailAddress || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(patient.emailAddress)) ? ' has-error' : '')}>
                                        <label htmlFor="emailAddress">Email Address</label>
                                        <input type="text" className="form-control" name="emailAddress" value={patient.emailAddress} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.emailAddress &&
                                            <div className="help-block">Email Address is required</div>
                                        }
                                        {submitted && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(patient.emailAddress) &&
                                            <div className="help-block">Invalid email address</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && (!patient.phoneNumber || patient.phoneNumber.length !== 10) ? ' has-error' : '')}>
                                        <label htmlFor="phoneNumber">Phone Number</label>
                                        <input type="text" pattern="\d*" maxLength="10" className="form-control" name="phoneNumber" value={patient.phoneNumber} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.phoneNumber &&
                                            <div className="help-block">Phone Number is required</div>
                                        }
                                        {submitted && patient.phoneNumber.length !== 10 &&
                                            <div className="help-block">Invalid Phone Number</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.nationality ? ' has-error' : '')}>
                                        <label htmlFor="nationality">Nationality</label>
                                        <input type="text" className="form-control" name="nationality" value={patient.nationality} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.nationality &&
                                            <div className="help-block">Nationality is required</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.stateId ? ' has-error' : '')}>
                                        <label htmlFor="stateId">State</label>
                                        <input type="text" className="form-control" name="stateId" value={patient.stateId} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.stateId &&
                                            <div className="help-block">State is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.occupation ? ' has-error' : '')}>
                                        <label htmlFor="occupation">Occupation</label>
                                        <input type="text" className="form-control" name="occupation" value={patient.occupation} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.occupation &&
                                            <div className="help-block">Occupation is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.address ? ' has-error' : '')}>
                                        <label htmlFor="address">Address</label>
                                        <input type="text" className="form-control" name="address" value={patient.address} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.address &&
                                            <div className="help-block">Address is required</div>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="clearfix"></div>

                            <div className="row">
                                <div className="col-sm-4 pt-4 pb-4">
                                    <h3> Next Of Kin information</h3>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.kinName ? ' has-error' : '')}>
                                        <label htmlFor="kinName">Kin Name</label>
                                        <input type="text" className="form-control" name="kinName" value={patient.kinName} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.kinName &&
                                            <div className="help-block">Kin Name is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.kinRelation ? ' has-error' : '')}>
                                        <label htmlFor="kinRelation">Kin Relation</label>
                                        <input type="text" className="form-control" name="kinRelation" value={patient.kinRelation} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.kinRelation &&
                                            <div className="help-block">Kin Relation is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && (!patient.kinPhoneNumber || patient.kinPhoneNumber.length !== 10) ? ' has-error' : '')}>
                                        <label htmlFor="kinPhoneNumber">Kin Phone Number</label>
                                        <input type="text" pattern="\d*" maxLength="10" className="form-control" name="kinPhoneNumber" value={patient.kinPhoneNumber} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.kinPhoneNumber &&
                                            <div className="help-block">Kin Phone Number is required</div>
                                        }
                                        {submitted && patient.kinPhoneNumber.length !== 10 &&
                                            <div className="help-block">Invalid Phone Number</div>
                                        }
                                    </div>
                                </div>
                            </div>


                            <div className="row">
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && (!patient.kinEmailAddress || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(patient.kinEmailAddress)) ? ' has-error' : '')}>
                                        <label htmlFor="kinEmailAddress">Kin Email Address</label>
                                        <input type="text" className="form-control" name="kinEmailAddress" value={patient.kinEmailAddress} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.kinEmailAddress &&
                                            <div className="help-block">Kin Email Address is required</div>
                                        }
                                        {submitted && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(patient.kinEmailAddress) &&
                                            <div className="help-block">Invalid email address</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.kinOccupation ? ' has-error' : '')}>
                                        <label htmlFor="kinOccupation">Kin Occupation</label>
                                        <input type="text" className="form-control" name="kinOccupation" value={patient.kinOccupation} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.kinOccupation &&
                                            <div className="help-block">Kin Occupation is required</div>
                                        }
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className={'form-group' + (submitted && !patient.kinAddress ? ' has-error' : '')}>
                                        <label htmlFor="kinAddress">Kin Address</label>
                                        <input type="text" className="form-control" name="kinAddress" value={patient.kinAddress} onChange={this.handleChange} disabled={this.state.viewMode} />
                                        {submitted && !patient.kinAddress &&
                                            <div className="help-block">Kin Address is required</div>
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-sm-4">
                                    <div className="form-group"></div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        {mode !== 'view' && <button className="btn btn-primary">Submit</button>}
                                        {addingPatient &&
                                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                        }
                                        <Link to="/" className="btn btn-link">Cancel</Link>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group"> </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { patient } = state.patients;
    return { patient };
}

const actionCreators = {
    addPatient: patientActions.addPatient,
    editPatient: patientActions.editPatient,
    getPatientById: patientActions.getPatientById
}

const connectedAddPatientPage = connect(mapState, actionCreators)(AddPatientPage);
export { connectedAddPatientPage as AddPatientPage };

