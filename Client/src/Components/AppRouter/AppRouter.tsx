import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"


export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>
            <Route></Route>
        </Routes>
        
        
    )
}