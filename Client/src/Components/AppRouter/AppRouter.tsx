import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { TipsPage } from "../../Pages/Tips page/TipsPage"
import { CategorizedTips } from "../../Pages/Tips page/CategorizedTips"


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path="tips" element={<TipsPage />} />
            <Route path="categorizedTips" element={<CategorizedTips />} />
        </Routes>
        
        
    )
}