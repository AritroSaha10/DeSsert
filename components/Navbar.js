import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUserAuth } from "../lib/UserContext";

import Deso from "deso-protocol";

// import Logo from "../public/images/icon.png";

import { GoThreeBars } from "react-icons/go";
import DesoConfig from "../lib/DesoConfig";

import links from "../lib/links";

export default function Navbar({ homePage }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [deso, setDeso] = useState();

    const { loggedIn, setLoggedIn } = useUserAuth();

    useEffect(() => {
        const myDeso = new Deso(DesoConfig);
        setDeso(myDeso);
    }, []);

    const login = async () => {
        const response = await deso.identity.login("3");
        response.key && setLoggedIn(true);
    };

    const logout = async () => {
        const currentUser = deso.identity.getUser();
        console.log("Logging out:", currentUser);
        const response = await deso.identity.logout(
            window.localStorage.getItem("deso_user_key")
        );
        console.log("logged out", response);
        response && setLoggedIn(false);
    };

    return (
        <nav
            className={`bg-orange-500 py-2 ${
                !homePage && "lg:py-4"
            } sticky top-0 drop-shadow-md`}
            style={{ zIndex: 9999999999 }}
        >
            <div className="container px-4 mx-auto lg:flex lg:items-center">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <a className="font-bold text-xl text-orange-900">
                            <h2>Project</h2>
                        </a>
                    </Link>

                    <button
                        className="border border-solid border-orange-900 px-3 py-1 rounded text-brown-600 opacity-50 hover: lg:hidden"
                        aria-label="Menu"
                        data-test-id="navbar-menu"
                        onClick={() => {
                            setShowDropdown(!showDropdown);
                        }}
                    >
                        <GoThreeBars />
                    </button>
                </div>

                <div
                    className={`${
                        showDropdown ? "flex" : "hidden"
                    } lg:flex flex-col lg:flex-row lg:ml-auto mt-3 lg:mt-0`}
                    data-test-id="navbar"
                >
                    {links.map(({ name, link, priority, id, isProtected }) => {
                        if (!loggedIn && isProtected) {
                            return null;
                        }

                        return (
                            <Link key={name} href={link}>
                                <a
                                    className={`${
                                        priority
                                            ? "text-orange-900 hover:bg-orange-300 hover:text-orange-300 text-center border border-solid border-orange-900 mt-1 lg:mt-0 lg:ml-1"
                                            : "text-orange-900 hover:bg-orange-600 hover:text-orange-300 "
                                    } p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors `}
                                    data-test-id={`navbar-${id}`}
                                >
                                    {name}
                                </a>
                            </Link>
                        );
                    })}

                    {loggedIn === true ? (
                        <button
                            className="text-orange-900 hover:bg-orange-600 hover:text-orange-300 text-center border border-solid border-orange-900 mt-1 lg:mt-0 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                            data-test-id={`navbar-logout`}
                            onClick={(e) => logout(e)}
                        >
                            Log out
                        </button>
                    ) : (
                        <button
                            className="text-orange-900 hover:bg-orange-600 hover:text-orange-300 text-center border border-solid border-orange-900 mt-1 lg:mt-0 lg:ml-1 p-2 lg:px-4 lg:mx-2 rounded duration-300 transition-colors"
                            data-test-id={`navbar-login`}
                            onClick={(e) => login(e)}
                        >
                            Log in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
}
