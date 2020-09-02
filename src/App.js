import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { alertActions } from './actions';
import { PrivateRoute } from './components';
import { history } from './helpers';
import { AddPatientPage, HomePage, LoginPage, RegisterPage, UsersPage } from './Pages';
import Layout from './Layouts/Layout';


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
                    <Route exact path="/users" component={UsersPage} />
                    <Route exact path="/patients/add" component={AddPatientPage} />
                    <Route exact path="/patients/:mode/:id" component={AddPatientPage} />
                    <Route exact path="/patients/:mode/:id" component={AddPatientPage}  />
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
                        {console.log("LOGGEDIN" + loggedIn)}
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
