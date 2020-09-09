import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { alertConstants, userConstants } from '../constants';
import { userActions } from './user.actions';


describe('add patient async actions', () => {
    let store;
    let httpMock;
    //    const flushAllPromises = () => new Promise(resolve => setImmediate(resolve));
    const initialState = {
        "users": [
            {
              "firstName": "Manu",
              "lastName": "Murali",
              "username": "manumurali",
              "password": "password",
              "id": 2
            }
          ]
    };

    beforeEach(() => {
        httpMock = new MockAdapter(axios);
        const mockStore = configureMockStore([thunk]);
        store = mockStore(initialState);
    });

    it('creates LOGIN_SUCCESS when user is logged in', async () => {
        const user = [
            {
              "firstName": "test First Name",
              "lastName": "test Last Name",
              "username": "test",
              "password": "password",
              "id": 2
            }
          ];
        httpMock.onGet('http://localhost:3004/users?username=test&password=password').reply(200, user);
        store.dispatch(userActions.login('test', 'password')).then(() => {
            const expectedActions = [{ type: userConstants.LOGIN_REQUEST, user: {username: 'test'} },
            { type: userConstants.LOGIN_SUCCESS, user: user }];
            expect(store.getActions()).toEqual(expectedActions);
        });

    });

    it('creates LOGIN_FAILURE when user login fails', async () => {

        httpMock.onGet('http://localhost:3004/users?username=invaliduser&password=password').reply(400);
        store.dispatch(userActions.login('invaliduser', 'password')).then(() => {
            const expectedActions = [{ type: userConstants.LOGIN_REQUEST, user: {username: 'invaliduser'} },
            { type: userConstants.LOGIN_FAILURE, error: "Request failed with status code 400" },
            { type: alertConstants.ERROR, message: "Request failed with status code 400" }];
            expect(store.getActions()).toEqual(expectedActions);
        });

    });

    it('creates LOGOUT when user logouts', async () => {
        const expectedAction = { type: userConstants.LOGOUT };
        expect(userActions.logout()).toEqual(expectedAction);
    });

    it('creates REGISTER_SUCCESS when user registers successfully', async () => {
        const user = {
              "firstName": "testuser",
              "lastName": "test",
              "username": "testuser",
              "password": "password",
              "id": 2
            };
        httpMock.onGet('http://localhost:3004/users?username=testuser').reply(200, []);
        httpMock.onPost('http://localhost:3004/users', user).reply(200);
        store.dispatch(userActions.register(user)).then(() => {
            const expectedActions = [{ type: userConstants.REGISTER_REQUEST, user: user },
                { type: userConstants.REGISTER_SUCCESS, user: user },
                { type: alertConstants.SUCCESS, message: 'Registration successful' }];
            expect(store.getActions()).toEqual(expectedActions);
        });

    });

    it('creates REGISTER_FAILURE when username already exists', async () => {
        const user = {
              "firstName": "testuser",
              "lastName": "test",
              "username": "testuser",
              "password": "password",
              "id": 2
            };
        httpMock.onGet('http://localhost:3004/users?username=testuser').reply(200, [user]);
        store.dispatch(userActions.register(user)).then(() => {
            const expectedActions = [{ type: userConstants.REGISTER_REQUEST, user: user },
                { type: alertConstants.ERROR, message: 'User Name Already Exists!' },
                { type: userConstants.REGISTER_FAILURE, error: 'User Name Already Exists!' }];
            expect(store.getActions()).toEqual(expectedActions);
        });

    });

    it('creates GETALL_SUCCESS when all users fetched', async () => {
        const users = [{
            "firstName": "testuser",
            "lastName": "test",
            "username": "",
            "password": "password",
            "id": 2
          }];
        httpMock.onGet('http://localhost:3004/users').reply(200, users);
        store.dispatch(userActions.getAll()).then(() => {
            const expectedActions = [{ type: userConstants.GETALL_REQUEST },
                { type: userConstants.GETALL_SUCCESS, users: users }];
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('creates GETALL_FAILURE when all users fetch fails', async () => {
        httpMock.onGet('http://localhost:3004/users').reply(400);
        store.dispatch(userActions.getAll()).then(() => {
            const expectedActions = [{ type: userConstants.GETALL_REQUEST },
                { type: userConstants.GETALL_FAILURE, error: "Request failed with status code 400" },
                { type: alertConstants.ERROR, message: "Request failed with status code 400" }];
            expect(store.getActions()).toEqual(expectedActions)
        });
    });

    it('creates GETALL_SUCCESS when all users fetched', async () => {
        httpMock.onDelete('http://localhost:3004/users/2').reply(200);
        store.dispatch(userActions.delete(2)).then(() => {
            const expectedActions = [{ type: userConstants.DELETE_REQUEST, id: 2 },
                { type: userConstants.DELETE_SUCCESS, id: 2 }];
            expect(store.getActions()).toEqual(expectedActions)
        });

    });

    it('creates GETALL_FAILURE when all users fetch fails', async () => {
        httpMock.onDelete('http://localhost:3004/users/2').reply(400);
        store.dispatch(userActions.delete(2)).then(() => {
            const expectedActions = [{ type: userConstants.DELETE_REQUEST, id: 2 },
                { type: userConstants.DELETE_FAILURE,  id: 2, error: "Request failed with status code 400" },               
                { type: alertConstants.ERROR,  message: "Request failed with status code 400" }];
            expect(store.getActions()).toEqual(expectedActions)
        });
    });
   
});