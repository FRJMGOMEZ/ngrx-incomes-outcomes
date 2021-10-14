import { createAction } from '@ngrx/store';

export const isLoading = createAction('[Layout Component] start loading');
export const stopLoading = createAction('[Layout Component]  stop loading');
export const authIsLoading = createAction('[Layout Component] start loading');
export const authStopLoading = createAction('[Layout Component]  stop loading')