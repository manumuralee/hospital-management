import { users } from './users.reducer';
import { userConstants } from '../constants';
import expect from 'expect';

describe('users reducer', () => {
    const allUsers = [
        {
          "firstName": "Manu",
          "lastName": "Murali",
          "username": "manumurali",
          "password": "password",
          "id": 2
        },
        {
            "firstName": "Test",
            "lastName": "User",
            "username": "testuser",
            "password": "test",
            "id": 3
          }
      ];
    it('should return the initial state', () => {
        expect(users({}, {})).toEqual({}
        )
    });
    it('should handle GETALL_REQUEST', () => {
        expect(
            users({}, {
                type: userConstants.GETALL_REQUEST
            })).toEqual({
                loading: true
            })
    })
    it('should handle GETALL_SUCCESS', () => {
        expect(
            users({}, {
                type: userConstants.GETALL_SUCCESS,
                users: allUsers
            })).toEqual({
                items: allUsers
            })
    })
    it('should handle GETALL_FAILURE', () => {
        const errorMessage = 'get all users failed';
        expect(
            users({}, {
                type: userConstants.GETALL_FAILURE,
                error: errorMessage
            })).toEqual({
                error: errorMessage
            })
    })
    it('should handle DELETE_REQUEST', () => {
        const afterDeleteReq = [
            {
              "firstName": "Manu",
              "lastName": "Murali",
              "username": "manumurali",
              "password": "password",
              "id": 2
            },
            {
                "firstName": "Test",
                "lastName": "User",
                "username": "testuser",
                "password": "test",
                "id": 3,
                deleting: true
              }
          ];
        expect(
            users({items: allUsers}, {
                type: userConstants.DELETE_REQUEST,
                id: 3
            })).toEqual({
                items: afterDeleteReq
            })
    }) 
    it('should handle DELETE_SUCCESS', () => {
        const afterDeleteSuccess = [
            {
              "firstName": "Manu",
              "lastName": "Murali",
              "username": "manumurali",
              "password": "password",
              "id": 2
            }
          ];
        expect(
            users({items: allUsers}, {
                type: userConstants.DELETE_SUCCESS,
                id: 3
            })).toEqual({
                items: afterDeleteSuccess
            })
    })
    it('should handle DELETE_FAILURE', () => {
        const afterDeleteFailed = [
            {
                "firstName": "Manu",
                "lastName": "Murali",
                "username": "manumurali",
                "password": "password",
                "id": 2
              },
              {
                  "firstName": "Test",
                  "lastName": "User",
                  "username": "testuser",
                  "password": "test",
                  "id": 3,
                  deleteError: 'delete failed'
                }
          ];
          const errorMsg = 'delete failed'
        expect(
            users({items: allUsers}, {
                type: userConstants.DELETE_FAILURE,
                id: 3,
                error: errorMsg
            })).toEqual({
                items: afterDeleteFailed
            })
    })      
})