import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { TipsPage } from "../../Pages/Tips page/TipsPage"
import { PageNotFound } from "../../Pages/PageNotFound/PageNotFound"
import { EventsPage } from "../../Pages/EventsPage/EventsPage" 
import { MapPage } from "../../Pages/MapPage/MapPage"
import { CategorizedTips } from "../../Pages/Tips page/CategorizedTips"
import { SingleEvent } from "../../Pages/EventsPage/SingleEvent"

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>

            <Route path="tips" element={<TipsPage />} />
            <Route path="categorizedTips" element={<CategorizedTips />} />

            <Route path="*" element={<PageNotFound />}></Route>

            <Route path="events" element={<EventsPage />} />

            <Route path="map" element={<MapPage />}></Route>

            <Route path="event/:id" element={<SingleEvent />}></Route>  
        </Routes>
        
        
    )
}