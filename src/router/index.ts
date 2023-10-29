import Event from "../pages/Event/Event";
import Login from "../pages/Login/Login";

export interface IRoute {
    path: string;
    component: React.ComponentType;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
}

export const publicRoute: IRoute[] = [
    {path: RouteNames.LOGIN, component: Login}
]

export const privateRoute: IRoute[] = [
    {path: RouteNames.EVENT, component: Event}
]