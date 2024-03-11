import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { TipsPage } from "../../Pages/Tips page/TipsPage"


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path="tips" element={<TipsPage />} />
        </Routes>
        
        
    )
}