import { createAction } from '@ngrx/store';

export const modalLoading = createAction('[UI] when using the loading modal');
export const modalLoadingStop = createAction('[UI]  when the loading modal must close beacuse the load has ended');
export const btnLoading = createAction('[UI] when using the loading button in component');
export const btnLoadingStop = createAction('[UI] when the loading button stops because the load has ended');