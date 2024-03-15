import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";

export const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
    selectAuthState, //state => state["auth"], //alternative version
    (auth) => !!auth.user
)

export const isLoggedOut = createSelector(
    selectAuthState, //state => state["auth"], //alternative version
    (auth) => !auth.user
)