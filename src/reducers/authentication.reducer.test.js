import expect from 'expect';
import { userConstants } from '../constants';
import { authentication } from './authentication.reducer';

describe('authentication reducer', () => {
    it('should return the initial state', () => {
        expect(authentication({}, {})).toEqual({}
        )
    });
    it('should handle LOGIN_REQUEST', () => {
        const user = { username: 'testuser', password: 'password' }
        expect(
            authentication({}, {
                type: userConstants.LOGIN_REQUEST,
                user: user
            })).toEqual({
                loggingIn: true,
                user: user
            })
    });
    it('should handle LOGIN_SUCCESS', () => {
        const user = { username: 'testuser', password: 'password' }
        expect(
            authentication({}, {
                type: userConstants.LOGIN_SUCCESS,
                user: user
            })).toEqual({
                loggedIn: true,
                user: user
            })
    });
    it('should handle LOGIN_FAILURE', () => {
        expect(
            authentication({}, {
                type: userConstants.LOGIN_FAILURE,
                error: 'error message'
            })).toEqual({})
    });
    it('should handle LOGOUT', () => {
        expect(
            authentication({}, {
                type: userConstants.LOGOUT
            })).toEqual({})
    });
})