import { createContext, useContext, useState, useEffect }from 'react';


const UserKeyContext = createContext({})


const UserKeyProvider = ({ children }) => {
    const [userKey, setUserKey] = useState(null);

    useEffect(() => {

        const onLocalStorageChange = (event) => {
            console.log("REACTIVE")
            if (event.storageArea === "localStorage") {
                console.log("SET")
                setUserKey(localStorage.getItem('deso_user_key'))
            }
        }

        window.addEventListener('storage', onLocalStorageChange)

        return () => window.removeEventListener('storage', onLocalStorageChange);
    }, [])


    return (
        <UserKeyContext.Provider value={{userKey, setUserKey}}>
            {children}
        </UserKeyContext.Provider>
    )
}

const useUserKey = () => useContext(UserKeyContext)

export { useUserKey }
export default UserKeyProvider