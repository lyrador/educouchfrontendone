import { Route, Routes } from "react-router-dom"
import Appbar from "../components/Appbar"

function AuthRoutes() {
    return (
        <Routes>
            <Appbar />
            <Route path="/LmsAdminManagement" element={<LmsAdminManagement />} />


        </Routes>

    )
}