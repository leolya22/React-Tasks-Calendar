import { FC, useEffect } from "react"
import NavBar from "./components/NavBar/NavBar"
import AppRouter from "./components/AppRouter/AppRouter"
import { useActions } from "./hooks/useActions"
import { IUser } from "./models/IUser"

const App: FC = () => {
  const {setIsAuth, setUser} = useActions();

  useEffect( () => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true);
      setUser({username: localStorage.getItem('user' || '')} as IUser);
    }
  }, [])

  return (
    <>
      <NavBar />
      <AppRouter />
    </>
  )
}

export default App
