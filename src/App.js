import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { Route, Router, Switch } from 'react-router-dom';
import { alertActions } from './actions';
import { AddPatientPage, HomePage, LoginPage, RegisterPage, UsersPage } from './Components';
import { history } from './helpers';
import Layout from './Layouts/Layout';
import { PrivateRoute } from './router';



class App extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            //this.props.clearAlerts();
        });
    }

    render() {
        const { alert, loggedIn } = this.props;
        let routes = (
            <Router history={history}>
                <Switch>
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/logout" component={LoginPage} />

                    <PrivateRoute exact path="/" component={HomePage} />
                    <PrivateRoute exact path="/users" component={UsersPage} />
                    <PrivateRoute exact path="/patients/add" component={AddPatientPage} />
                    <PrivateRoute exact path="/patients/:mode/:id" component={AddPatientPage} />
                    <PrivateRoute exact path="/patients/:mode/:id" component={AddPatientPage} />
                </Switch>
            </Router>
        );
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert && alert.message &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }                        
                        {
                            true ? <Layout>{routes}</Layout> : routes
                        }
                    </div>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    const { loggedIn } = state.authentication;
    return { alert, loggedIn };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };

export default App;
