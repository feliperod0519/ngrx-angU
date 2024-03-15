import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { User } from '../model/user.model';
import { AuthActions } from '../action-types';


export const initialAuthState: AuthState = {
  user: undefined
}


export interface AuthState {
  user: User
}

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login,(state,action)=>{
    return {
              user: action.user
           }
  }),
  on(AuthActions.logout,(state,auction)=>{
    return {
              user: undefined
           }
  })
);


