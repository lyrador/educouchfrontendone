import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import WebPet from "web-pet";

export const RequireAuth = ({ children }) => {
    const auth = useAuth();
    const user = auth.user;
    console.log(auth.user)
        if (!auth.user) {
            return <Navigate to='/' />

        }
        return children
    }