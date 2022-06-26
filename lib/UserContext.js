import { useContext, createContext } from "react";
import { useState, useEffect } from "react";

const UserAuth = createContext({});

const UserAuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState();

    useEffect(() => {
        if (localStorage.getItem("deso_user_key")) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <UserAuth.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </UserAuth.Provider>
    );
};

const useUserAuth = () => useContext(UserAuth);

export { useUserAuth };
export default UserAuthProvider;
