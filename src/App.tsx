import './App.css'
import {useContext, useEffect} from "react";
import {AuthContext} from "./providers/AuthContextProvider.tsx";
import AuthPage from "./pages/AuthPage.tsx";
import {Route, Routes} from "react-router-dom";
import AppNavBar from "./uiComponents/navigation/AppNavBar.tsx";
import AOS from "aos";
import "aos/dist/aos.css"
import HomePage from "./pages/HomePage.tsx";
import {AppDataProvider} from "./providers/AppDataProvider.tsx";

function App() {
    const {loggedIn} = useContext(AuthContext);

    useEffect(() => {
        AOS.init()
    }, [])

    if (!loggedIn) return <AuthPage/>
    return (
        <AppDataProvider>
            <main>
                <AppNavBar/>
                <Routes>
                    <Route index={true} element={<HomePage/>}/>
                </Routes>
            </main>
        </AppDataProvider>
    );
}

export default App
