import { Route, Routes } from "react-router-dom"
import { HomePage } from "../../Pages/HomePage/HomePage"

<<<<<<< HEAD
=======
import { TipsPage } from "../../Pages/Tips page/TipsPage"

import { PageNotFound } from "../../Pages/PageNotFound/PageNotFound"


>>>>>>> 84bccfacbe9977be28907b8fafc2c76a4bb2e705

export const AppRouter = () => {
    return (
        <Routes>
            <Route index element={<HomePage />}></Route>
<<<<<<< HEAD
            <Route></Route>
=======

            <Route path="tips" element={<TipsPage />} />

            <Route path="*" element={<PageNotFound />}></Route>

>>>>>>> 84bccfacbe9977be28907b8fafc2c76a4bb2e705
        </Routes>
        
        
    )
}