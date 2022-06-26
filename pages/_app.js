import PageLayout from "../components/PageLayout";
import "../styles/globals.css";
import UserAuthProvider from "../lib/UserContext";
import { useRouter } from "next/router";
import links from "../lib/links";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    links.forEach(({ link }) => {
        // super super janky protected routes :(
        if (
            link.isProtected &&
            link == router.pathname &&
            typeof window !== "undefined"
        ) {
            if (
                window.localStorage.getItem("deso_user_key") == null ||
                window.localStorage.getItem("deso_user_key") == ""
            ) {
                router.push("/");
            }
        }
    });

    return (
        <UserAuthProvider>
            <PageLayout>
                <Component {...pageProps} />
            </PageLayout>
        </UserAuthProvider>
    );
}

export default MyApp;
