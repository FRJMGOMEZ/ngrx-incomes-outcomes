import { createReducer, on } from '@ngrx/store';
import * as incomesOutcomesActions from './incomes-outcomes.actions';

export interface State {
    items:[]
}

export const initialState: State = {
   items:[]
}

const _incomesOutcomesReducer = createReducer(initialState,
    on(incomesOutcomesActions.setItems, (state,{items}) => ({ ...state, items:[...items] as any })),
    on(incomesOutcomesActions.unsetItems, state => ({ ...state, items: [] })),
);

export function incomesOutcomesReducer(state, action) {
    return _incomesOutcomesReducer(state, action);
}