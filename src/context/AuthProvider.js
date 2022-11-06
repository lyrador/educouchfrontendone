import { createContext, useContext, useState } from "react";
import WebPet from "web-pet";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [firstPet, setFirstPet] = useState(null);

    const login = (user) => {
        setUser(user);
        if (user.userEnum === "KID") {
            const opt = {
                name: 'Couchy',
                footPrint: false,
                report: false,
                action: {
                    firstGreet: false,
                    randomMove: true,
                    randomSay: true
                },
                on: {
                    create: function () {
                        console.info("you will see me in create hook");
                    }
                    // mounted: function () {
                    //     console.info("you will see me in mounted hook");
                    // }
                }
            }
            const firstPet_ = new WebPet(opt);
            setFirstPet(firstPet_);
        }
    }

    const logout = (user) => {
        setUser(null);
        if (firstPet) {
            firstPet.hide(true);
        }
    }
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}