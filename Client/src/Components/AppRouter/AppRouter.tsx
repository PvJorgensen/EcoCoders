import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { TipsPage } from "../../Pages/Tips page/TipsPage"
import { PageNotFound } from "../../Pages/PageNotFound/PageNotFound"
import Login from "../../Pages/Login/Login"
import { Events } from "../../Pages/EventsPage/Events"
import { MapPage } from "../../Pages/MapPage/MapPage"
import { CategorizedTips } from "../../Pages/Tips page/CategorizedTips"

import Auth from "../../services/auth.service";
import SignUp from "../../Pages/Login/SignUp"
import Form from "../../Pages/Login/Form"


export const AppRouter = () => {
    Auth();

    return (
        <Routes>
            <Route index element={<HomePage />}></Route>

            <Route path="tips" element={<TipsPage />} />
            <Route path="categorizedTips" element={<CategorizedTips />} />

            <Route path="*" element={<PageNotFound />}></Route>

            <Route path="login" element={<Login />}></Route>

            <Route path="events" element={<Events />} />

            <Route path="map" element={<MapPage />}></Route>

            <Route path="signup" element={<SignUp />}></Route>
            <Route path="form" element={<Form />}></Route>
        </Routes>
        
        
    )
}