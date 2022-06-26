import React from "react";
import MetaInfo from "../components/MetaInfo";
import Image from "next/image";

import Bulb from "../public/images/bulb.jpeg";
import Char from "../public/images/char.jpeg";
import Panch from "../public/images/panch.webp";
import Squirtle from "../public/images/squirtle.jpeg";
import { FaGithub } from "react-icons/fa";
import { SiDevpost } from "react-icons/si";

const AboutCard = ({ name, img, description }) => (
    <div className="flex flex-col items-center p-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl">
        <Image
            src={img}
            className="w-32 h-32 rounded-full object-cover"
            height={200}
            width={200}
        />
        <h3 className="text-2xl font-bold text-orange-900 mt-2">{name}</h3>
        <h4 className="mt-2 text-orange-900 text-center">{description}</h4>
    </div>
);

export default function About() {
    return (
        <div>
            <MetaInfo name="About" />
            <h1 className="text-4xl font-bold text-orange-900 text-center mt-8 mb-4">
                What is this?
            </h1>

            <p className="text-2xl text-center">
                DeSsert is the new way to share summer recipes with each other
                through the power of web3!
            </p>

            <h1 className="text-4xl font-bold text-orange-900 text-center mt-8 mb-4">
                Why?
            </h1>

            <p className="text-xl px-8 lg:px-16 xl:px-32 text-center">
                We believe that web3 is the future of the internet, which is why
                we chose to make something using DeSo, a great API for creating
                Decentralized Social Media applications. As we start to enjoy
                summer, we realized that we could help people talk with each
                other about something universally liked: food!
            </p>

            <h1 className="text-4xl font-bold text-orange-900 text-center my-8">
                About Us
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full p-8 gap-8 lg:gap-16">
                <AboutCard
                    name="Aritro Saha"
                    img={Bulb}
                    description="Hi! I'm Aritro. I'm in Grade 10, and I enjoy biking during the summer!"
                />
                <AboutCard
                    name="Musa Khan"
                    img={Char}
                    description="Hey! My name is Musa Khan, I enjoy programming in my free time, big fan of cars, and love basketball."
                />
                <AboutCard
                    name="Stephen Ni"
                    img={Panch}
                    description="Hey there! My name is Stephen, I'm in the 11th grade studying at John Fraser Secondary School. I LOVE turtles and learning more about code!"
                />
                <AboutCard
                    name="Aditiya Ajay"
                    img={Squirtle}
                    description="Hi, I’m Aditya! I’m a Grade 11 student at John Fraser. I love playing classical music and reading Murakami."
                />
            </div>

            <h1 className="text-4xl font-bold text-orange-900 text-center mt-8 mb-4">
                Links
            </h1>

            <div className="flex w-full flex-col items-center justify-center md:flex-row gap-6 mb-8">
                <a
                    className="flex items-center gap-1 text-2xl text-blue-600 hover:underline active:text-blue-700"
                    href="https://github.com/musakhan16/deso-app"
                >
                    <FaGithub className="text-gray-700" /> GitHub
                </a>

                <a 
                    className="flex items-center gap-1 text-2xl text-blue-600 hover:underline active:text-blue-700"
                    href="https://devpost.com/software/dessert"
                >
                    <SiDevpost className="text-gray-700" /> Devpost
                </a>
            </div>
        </div>
    );
}
