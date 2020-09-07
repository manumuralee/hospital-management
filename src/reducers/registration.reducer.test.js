import expect from 'expect';
import { userConstants } from '../constants';
import { registration } from './registration.reducer';

describe('registration reducer', () => {
    const user = {username: 'testuser', password: 'password'};
    it('should return the initial state', () => {
        expect(registration({}, {})).toEqual({}
        )
    });

    it('should handle REGISTER_REQUEST', () => {
        expect(
            registration({}, {
                type: userConstants.REGISTER_REQUEST,
                user: user
            })).toEqual({
                registering: true
            })
    });

    it('should handle LOGIN_SUCCESS', () => {
        expect(
            registration({}, {
                type: userConstants.REGISTER_SUCCESS,
                user: user
            })).toEqual({
            })
    });

    it('should handle REGISTER_FAILURE', () => {
        expect(
            registration({}, {
                type: userConstants.REGISTER_FAILURE,
                error: 'Error occured'
            })).toEqual({
            })
    });    
    
})