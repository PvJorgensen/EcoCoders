import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { TipsPage } from "../../Pages/Tips page/TipsPage"
import { PageNotFound } from "../../Pages/PageNotFound/PageNotFound"
import { Events } from "../../Pages/EventsPage/Events"
import { MapPage } from "../../Pages/MapPage/MapPage"
import { CategorizedTips } from "../../Pages/Tips page/CategorizedTips"


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>

            <Route path="tips" element={<TipsPage />} />
            <Route path="categorizedTips/:category" element={<CategorizedTips />} />

            <Route path="*" element={<PageNotFound />}></Route>

            <Route path="events" element={<Events />} />

            <Route path="map" element={<MapPage />}></Route>
        </Routes>
        
        
    )
}