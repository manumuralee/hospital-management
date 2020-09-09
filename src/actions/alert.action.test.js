import { alertConstants } from '../constants';
import { alertActions } from './alert.actions';

describe('alert actions', () => {
    it('should create an action to alert success', () => {
        const message = 'Success';
        const expectedAction = { type: alertConstants.SUCCESS, message };
        expect(alertActions.success(message)).toEqual(expectedAction);
    });
    it('should create an action to alert error', () => {
        const message = 'Error';
        const expectedAction = { type: alertConstants.ERROR, message };
        expect(alertActions.error(message)).toEqual(expectedAction);
    });
    it('should create an action to alert clear', () => {
        const expectedAction = { type: alertConstants.CLEAR };
        expect(alertActions.clear()).toEqual(expectedAction);
    });
});