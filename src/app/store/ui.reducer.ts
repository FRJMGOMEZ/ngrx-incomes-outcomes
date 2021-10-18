import { createReducer, on } from '@ngrx/store';
import * as lActions from './ui.actions';

export interface State {
    btnLoading: boolean; 
    modalLoading:boolean;
}

export const initialState: State = {
   btnLoading: false,
   modalLoading:false
}

const _uiReducer = createReducer(initialState,
    on(lActions.modalLoading, state => ({ ...state, modalLoading: true })),
    on(lActions.modalLoadingStop, state => ({ ...state, modalLoading: false })),
    on(lActions.btnLoading, state => ({ ...state, btnLoading: true})),
    on(lActions.btnLoadingStop, state => ({ ...state, btnLoading: false})),
);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}