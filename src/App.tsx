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
import MyFinancesPage from "./pages/MyFinancesPage.tsx";
import LostPage from "./pages/LostPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import AdminPage from "./pages/AdminPage.tsx";

function App() {
    const {loggedIn} = useContext(AuthContext);

    useEffect(() => {
        AOS.init()
    }, [])

    if (!loggedIn) return <AuthPage/>
    return (
        <AppDataProvider>
            <main className={"w-full h-full"}>
                <AppNavBar/>
                <Routes>
                    <Route index={true} element={<HomePage/>}/>
                    <Route path={"/my-finance"} element={<MyFinancesPage />}/>
                    <Route path={"/profile"} element={<ProfilePage />}/>
                    <Route path={"/admin/*"} element={<AdminPage />} />
                    <Route path={"/*"} element={<LostPage />} />
                </Routes>
            </main>
        </AppDataProvider>
    );
}

export default App
