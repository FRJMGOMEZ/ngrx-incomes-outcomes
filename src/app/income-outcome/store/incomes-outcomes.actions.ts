import { createAction, props } from '@ngrx/store';
import { IncomeOutcome } from '../../core/models/incomes-outcome.model';

export const setItems = createAction('[IncomesOutcomes Component] setting items',props<{items:IncomeOutcome[]}>());
export const unsetItems = createAction('[IncomesOutcomes Component] unsetting items');