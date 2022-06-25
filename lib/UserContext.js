import { useContext, createContext } from 'react';
import { useState, useEffect } from 'react';

const UserAuth = createContext({})

const UserAuthProvider = ({ children }) => {
    const [userPublicKey, setPublicKey] = useState("");

    const setUserPublicKey = (key) => {
        if (!window.localStorage.getItem('user_public_key')) {
            window.localStorage.setItem('user_public_key', key)
        }
        
        setPublicKey(userPublicKey)
    }

    useEffect(() => {
        if (window.localStorage.getItem('user_public_key')) {
            setPublicKey(window.localStorage.getItem('user_public_key'))
        }
    }, [])

    return (
        <UserAuth.Provider value={{userPublicKey, setUserPublicKey}}>
            {children}
        </UserAuth.Provider>
    )
}

const useUserAuth = () => useContext(UserAuth);

export { useUserAuth }
export default UserAuthProvider