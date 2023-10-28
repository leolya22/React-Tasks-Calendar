import { AppDispatch } from "../..";
import { IUser } from "../../../models/IUser";
import { AuthActionTypes, SetAuthAction, SetErrorAction, SetIsLoadingAction, SetUserAction } from "./types";
import UserService from "../../../api/UserService";



export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({type: AuthActionTypes.SET_USER, payload: user}),
    setError: (payload: string): SetErrorAction => ({type: AuthActionTypes.SET_ERROR, payload}),
    setIsLoading: (payload: boolean): SetIsLoadingAction => ({type: AuthActionTypes.SET_IS_LOADING, payload}),
    setIsAuth: (auth: boolean): SetAuthAction => ({type: AuthActionTypes.SET_AUTH, payload: auth}),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));
            setTimeout(async () => {
                const users = await UserService.getUsers();
                const findUser = users.data.find(user => user.username === username && user.password === password);
                if(findUser) {
                    localStorage.setItem('auth', 'true');
                    localStorage.setItem('user', findUser.username);
                    dispatch(AuthActionCreators.setIsAuth(true));
                    dispatch(AuthActionCreators.setUser(findUser));
                    dispatch(AuthActionCreators.setError(''));
                } else {
                    dispatch(AuthActionCreators.setError('The username or password are wrong'));
                }
                dispatch(AuthActionCreators.setIsLoading(false));
            }, 1000)
        } catch (error) {
            dispatch(AuthActionCreators.setError('An error has ocurred'))
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        dispatch(AuthActionCreators.setIsLoading(true));
        setTimeout(() => {
            localStorage.removeItem('auth');
            localStorage.removeItem('user')
            dispatch(AuthActionCreators.setIsAuth(false));
            dispatch(AuthActionCreators.setUser({} as IUser));
            dispatch(AuthActionCreators.setIsLoading(false));
        }, 1000)
    },
}