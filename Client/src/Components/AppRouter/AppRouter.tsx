import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { TipsPage } from "../../Pages/Tips page/TipsPage"
import { PageNotFound } from "../../Pages/PageNotFound/PageNotFound"
import { EventsPage } from "../../Pages/EventsPage/EventsPage" 
import { MapPage } from "../../Pages/MapPage/MapPage"
import { CategorizedTips } from "../../Pages/Tips page/CategorizedTips"
import { SingleEvent } from "../../Pages/EventsPage/SingleEvent"
import Login from "../../Pages/Login/Login"
import Auth from "../../services/auth.service";
import SignUp from "../../Pages/Login/SignUp"
import Form from "../../Pages/Login/Form"
<<<<<<< HEAD
import Landing from "../../Pages/Login/Landing"

=======
import ProfilePage from "../../Pages/PorfilePage/ProfilePage"
>>>>>>> a13fc3e3dae4d15e6237c133d122ef0964d0e477

export const AppRouter = () => {
    // Auth();

    return (
        <Routes>
            <Route index element={<HomePage />}></Route>
<<<<<<< HEAD

            <Route path="landing" element={<Landing />} />

=======
>>>>>>> a13fc3e3dae4d15e6237c133d122ef0964d0e477
            <Route path="tips" element={<TipsPage />} />
            <Route path="categorizedTips/:category" element={<CategorizedTips />} />
            <Route path="*" element={<PageNotFound />}></Route>
            <Route path="events" element={<EventsPage />} />
            <Route path="map" element={<MapPage />}></Route>
            <Route path="event/:id" element={<SingleEvent />}></Route>  
            <Route path="login" element={<Login />}></Route>
            <Route path="signup" element={<SignUp />}></Route>

            <Route path="form" element={<Form />}></Route>

<<<<<<< HEAD
=======
            <Route path="profile" element={<ProfilePage />}></Route>
>>>>>>> a13fc3e3dae4d15e6237c133d122ef0964d0e477
        </Routes>
        
        
    )
}