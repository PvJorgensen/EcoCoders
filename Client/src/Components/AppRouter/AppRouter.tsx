import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { TipsPage } from "../../Pages/Tipspage/TipsPage"
import { PageNotFound } from "../../Pages/PageNotFound/PageNotFound"
import { EventsPage } from "../../Pages/EventsPage/EventsPage" 
import { MapPage } from "../../Pages/MapPage/MapPage"
import { CategorizedTips } from "../../Pages/Tipspage/CategorizedTips"
import { SingleEvent } from "../../Pages/EventsPage/SingleEvent"
import Login from "../../Pages/Login/Login"
import Auth from "../../services/auth.service";
import SignUp from "../../Pages/Login/SignUp"
import Form from "../../Pages/Login/Form"
import Landing from "../../Pages/Login/Landing"
import ProfilePage from "../../Pages/PorfilePage/ProfilePage"
import { DetailTips } from "../../Pages/Tipspage/DetailTips"


export const AppRouter = () => {
   
    // Auth();

    
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>

            <Route path="landing" element={<Landing />} />

            <Route path="tips" element={<TipsPage />} />
            <Route path="detailtips/:category/:id" element={<DetailTips />} />

            <Route path="categorizedTips/:category" element={<CategorizedTips />} />
            <Route path="*" element={<PageNotFound />}></Route>
            <Route path="events" element={<EventsPage />} />
            <Route path="map" element={<MapPage />}></Route>
            <Route path="map/:id" element={<MapPage />}></Route>
            <Route path="event/:id" element={<SingleEvent />}></Route>  
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<SignUp />}></Route>

            <Route path="form" element={<Form />}></Route>

            <Route path="profile" element={<ProfilePage />}></Route>
        </Routes>
        
        
    )
}