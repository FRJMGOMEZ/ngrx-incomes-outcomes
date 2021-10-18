import { ActionReducerMap } from '@ngrx/store';
import * as ui from './ui.reducer'
import * as auth from './auth.reducer';
import * as incomesOutcomes from './incomes-outcomes.reducer';

export interface AppState {
   ui:ui.State,
   auth:auth.State,
   incomesOutcomes:incomesOutcomes.State
}
export const appReducers: ActionReducerMap<AppState> = {
  ui:ui.uiReducer,
  auth:auth.authReducer,
  incomesOutcomes:incomesOutcomes.incomesOutcomesReducer
}