import Deso from "deso-protocol";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import DesoConfig from "../lib/DesoConfig";
// import Food from '../public/images/food.jpg'
import Watermelon from "../public/images/even-more-popsicles.jpg";
import { useUserAuth } from "../lib/UserContext";
import PageSection from "../components/PageSection";
import MetaInfo from "../components/MetaInfo";

export default function Home() {
    const { loggedIn, setLoggedIn } = useUserAuth();

    useEffect(() => {
        const deso = new Deso(DesoConfig);

        if (deso.identity.getUserKey()) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div className="bg-[#f8a5c3] h-full">
            <MetaInfo name="Home" />
            <div className="flex flex-col md:flex-row md:justify-around items-center p-10 lg:px-20 min-h-[80vh]">
                <div className="md:w-1/2 space-y-4">
                    <h1 className="text-5xl font-bold text-orange-900 text-left">
                        Summer recipes, by everyone, for everyone.
                    </h1>

                    <h3 className="text-lg">
                        This summer, prepare to use the only decentralized food
                        network to make the best food, snacks, and drinks.
                    </h3>

                    <div className="flex items-center mt-2 space-x-4">
                        {loggedIn ? (
                            <>
                                <Link href="/dashboard">
                                    <a className="rounded-lg p-4 text-white bg-zinc-800 font-bold hover-scale">
                                        Get Started
                                    </a>
                                </Link>
                                <Link href="/compose">
                                    <a className="rounded-lg p-4 text-white bg-zinc-800 font-bold hover-scale">
                                        Add Recipe
                                    </a>
                                </Link>
                            </>
                        ) : (
                            <button
                                className="rounded-lg p-4 text-white bg-green-800 font-bold hover-scale"
                                onClick={async () => {
                                    const deso = new Deso(DesoConfig);
                                    const response = await deso.identity.login(
                                        "3"
                                    );
                                    response.key && setLoggedIn(true);
                                }}
                            >
                                Get Started
                            </button>
                        )}
                    </div>
                </div>

                <div>
                    <Image
                        src={Watermelon}
                        width={(6762 * 1) / 16}
                        height={(7214 * 1) / 16}
                        className="rounded-lg"
                    />
                </div>
            </div>

            <PageSection
                title="Get your plates ready!"
                description="We strive to  make sure you get the best recipees and dishes so you can enjoy this wonderous summer"
                subheading="Guaranteed taste of heaven"
                imageSrc="https://images.unsplash.com/photo-1523986371872-9d3ba2e2a389?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
            />

            <PageSection
                title="Travel the World!"
                description="We provide a multitude of traditional and exotic cuisines from cultures all around the globe"
                subheading="Explore different cultures"
                imageSrc="https://images.unsplash.com/photo-1493807742375-fbc46d996e8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1104&q=80"
                reversed
            />
            
            <PageSection
                title="Own your content"
                description="We empower chefs by providing a platform indepedent from a central authority"
                subheading="Completely decentralized"
                imageSrc="https://images.unsplash.com/photo-1556911261-6bd341186b2f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fGhhcHB5JTIwY2hlZnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
            />
        </div>
    );
}
