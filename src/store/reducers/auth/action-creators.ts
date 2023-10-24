import axios from "axios";
import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import { AuthActionTypes, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionTypes.SET_USER, payload: user}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionTypes.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionTypes.SET_IS_LOADING, payload}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionTypes.SET_AUTH, payload: auth}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async () => {
                const users = await axios.get<IUser[]>('./users.json');
                const findUser = users.data.find(user => user.username === username && user.password === password);
                if(findUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('user', findUser.username);
                    dispatch(AuthActionCreators.setIsAuth(true));
                    dispatch(AuthActionCreators.setUser(findUser));
                    console.log('done');
                    
                } else {
                    console.log('The username or password are wrong');
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000)
        } catch (error) {
            dispatch(AuthActionCreators.setError('An error has ocurred'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(() => {
                dispatch(AuthActionCreators.setIsAuth(false));
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000)
        } catch (error) {
            dispatch(AuthActionCreators.setError('An error has ocurred'))
        }
    },
}