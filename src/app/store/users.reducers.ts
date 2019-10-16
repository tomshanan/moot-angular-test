import { UserDetails } from '../models/user.model';
import * as userActions from './users.actions'
import { Guid } from '../shared/global-functions';

export interface State {
    users: UserDetails[]
}
const defaultState:State = {
    users: [{
        id: Guid.newGuid(),
        name: 'Tom',
        surname: 'Shanan',
        birthdate: '2019-01-01',
        email: 'tomshanan@gmail.com',
        office: 'Poplar',
        job: 'Front-end Developer',
    }]
}

export function userReducers(state = defaultState, action: userActions.Actions){
    let userState = state.users.slice()
    switch(action.type){
        case userActions.ADD_USER:
            return {
                ...state,
                users: [...userState,action.payload.user]
            }
        case userActions.REMOVE_USER:
            const id = action.payload.id
            const indexFound = userState.findIndex(user=>user.id === id)
            if(indexFound > -1){
                userState.splice(indexFound,1)
            }
            return {
                ...state,
                users: [...userState]
            }
        default:
            return state
    }
}