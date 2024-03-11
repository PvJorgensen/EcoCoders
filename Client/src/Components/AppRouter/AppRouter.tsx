import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"
import { PageNotFound } from "../../Pages/PageNotFound/PageNotFound"


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
        
        
    )
}