import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import UserListContainer from './UserListContainer.tsx'
import UserFacade from './UserFacade.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UserFacade />
  </React.StrictMode>,
)
