import expect from 'expect';
import { alertConstants } from '../constants';
import { alert } from './alert.reducer';

describe('alert reducer', () => {
    it('should return the initial state', () => {
        expect(alert({}, {})).toEqual({}
        )
    });
    it('should handle alertConstants.SUCCESS', () => {
        const message = "Success";
        expect(alert({}, {
            type: alertConstants.SUCCESS,
            message: message
        })).toEqual({
            type: 'alert-success',
            message: message
          }
        )
    });
    it('should handle alertConstants.ERROR', () => {
        const message = "Danger";
        expect(alert({}, {
            type: alertConstants.ERROR,
            message: message
        })).toEqual({
            type: 'alert-danger',
            message: message
          }
        )
    });
    it('should handle alertConstants.CLEAR', () => {
        expect(alert({}, {
            type: alertConstants.CLEAR
        })).toEqual({})
    });
})