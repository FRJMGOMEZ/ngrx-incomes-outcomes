import { createReducer, on } from '@ngrx/store';
import * as lActions from './ui.actions';

export interface State {
    isLoading: boolean; 
    authLoading:boolean;
}

export const initialState: State = {
   isLoading: false,
   authLoading:false
}

const _uiReducer = createReducer(initialState,
    on(lActions.authIsLoading, state => ({ ...state, authLoading: true })),
    on(lActions.authStopLoading, state => ({ ...state, authLoading: false })),
    on(lActions.isLoading, state => ({ ...state, authLoading: true})),
    on(lActions.stopLoading, state => ({ ...state, authLoading: false})),
);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}