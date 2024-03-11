import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

export const login = createAction(
    '[Login] login', props<{user:User}>()
)

export const logout = createAction(
    '[Top Menu] logout'
)

//const newLoginAction = login()... bla bla bla