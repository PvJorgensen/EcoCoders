import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { TipsPage } from "../../Pages/Tips page/TipsPage"
import { PageNotFound } from "../../Pages/PageNotFound/PageNotFound"
import { Events } from "../../Pages/EventsPage/Events"

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>

            <Route path="tips" element={<TipsPage />} />

            <Route path="*" element={<PageNotFound />}></Route>

            <Route path="events" element={<Events />} />


        </Routes>
        
        
    )
}