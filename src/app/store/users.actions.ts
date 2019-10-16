import { Action } from '@ngrx/store';
import { UserDetails } from '../models/user.model';

export const ADD_USER = "ADD_USER"
export const REMOVE_USER = "REMOVE_USER"

export class AddUser implements Action {
    readonly type = ADD_USER;
    constructor(public payload: {user: UserDetails}){}
}
export class RemoveUser implements Action {
    readonly type = REMOVE_USER;
    constructor(public payload: {id: string}){}
}

export type Actions = AddUser | RemoveUser;