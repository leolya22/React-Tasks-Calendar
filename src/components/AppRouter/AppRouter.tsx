import { Navigate, Route, Routes } from "react-router-dom";
import { privateRoute, publicRoute } from "../../router";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import Loader from "../Loader/Loader";
import styles from './AppRouter.module.css'

const AppRouter = () => {
    const {isAuth, isLoading} = useTypedSelector(state => state.auth);
    return (
        <div className={styles.appRouter}>
            {isLoading
            ?
                <Loader />
            :
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
            }
        </div>
    );
}

export default AppRouter;