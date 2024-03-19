import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import QueryProvider from "./providers/QueryProvider.tsx";
import AuthContextProvider from "./providers/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <QueryProvider>
                <AuthContextProvider>
                    <App/>
                </AuthContextProvider>
            </QueryProvider>
        </BrowserRouter>
    </React.StrictMode>,
)
