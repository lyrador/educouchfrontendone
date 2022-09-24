import { Route, Routes } from "react-router-dom"
import Appbar from "../components/Appbar"
import Login from "../pages/Login"

function UnauthRoutes() {
    return (
        <Routes>
            <Appbar />
            <Route path="/" element={<Login />} />


        </Routes>

    )
}