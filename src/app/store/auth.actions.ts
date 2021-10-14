import { createAction, props } from '@ngrx/store';
import { User } from '../core/models/user.model';

export const setUser = createAction('[Auth] set User',props<{user:User}>());

export const unsetUser = createAction('[Auth] unset User');