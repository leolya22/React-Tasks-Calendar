import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store/index.ts'
import AppRouter from './components/AppRouter.tsx'
import NavBar from './components/NavBar/NavBar.tsx'
import { Content } from 'antd/es/layout/layout'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
        <Content>
          <AppRouter />
        </Content>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
