import { createReducer, on } from '@ngrx/store';
import { User } from '../core/models/user.model';
import * as authActions from './auth.actions';

export interface State {
    user: User; 
}

export const initialState: State = {
   user: null,
}

const _authReducer = createReducer(initialState,
    on(authActions.setUser, (state,{user}) => ({ ...state, user:{...user}})),
    on(authActions.unsetUser, state => ({ ...state, user: null })),
);

export function authReducer(state, action) {
    return _authReducer(state, action);
}