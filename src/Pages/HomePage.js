import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { patientActions } from '../actions';



class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: this.createColumnDefs()
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.columnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
    }
    createColumnDefs() {
        return [
            { headerName: "Id", field: "id" },
            { headerName: "SurName", field: "firstName" },
            { headerName: "Frist Name", field: "surName" },
            { headerName: "Contact", field: "phoneNumber" },
            { headerName: "Action", field: "id", cellRenderer: "ActionLinkComponent" },
        ];
    }

    componentDidMount() {
        this.props.getAllPatients();
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
                    </div>
                    <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                        {patients.items &&
                            <AgGridReact
                                columnDefs={this.state.columnDefs}
                                rowData={patients.items}
                                onGridReady={this.onGridReady}
                                frameworkComponents={{
                                    ActionLinkComponent
                                }}>
                            </AgGridReact>
                        }
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
    getAllPatients: patientActions.getAllPatients

}

function ActionLinkComponent(props) {
    return (<span>
        <Link className="btn btn-primary mr-2" to={`/patients/view/${props.value}`} >View</Link>
        <Link className="btn btn-outline-primary mr-2" to={`/patients/edit/${props.value}`} >Edit</Link>
    </span>
    );
}


const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };

