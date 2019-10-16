import { ActionReducerMap } from "@ngrx/store";
import * as  fromUsers  from './store/users.reducers';

export interface appState {
    users: fromUsers.State
}

export const reducers:ActionReducerMap<appState> = {
    users: fromUsers.userReducers
}