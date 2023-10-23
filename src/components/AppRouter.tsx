import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoute, publicRoute } from "../router";
import { useTypedSelector } from "../hooks/useTypedSelector";

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth);
    return (
        isAuth 
        ?
        <Routes>
            {privateRoute.map( route => <Route key={route.path} path={route.path} Component={route.component} />)}
            <Route path="*" element={<Navigate to='/' replace/>}/>
        </Routes>
        :
        <Routes>
            {publicRoute.map( route => <Route key={route.path} path={route.path} Component={route.component} />)}
            <Route path="*" element={<Navigate to='/login' replace/>}/>
        </Routes>
    );
}

export default AppRouter;