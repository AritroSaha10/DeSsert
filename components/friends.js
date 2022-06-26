import React from "react";
import { FaUserFriends } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { SliderData } from "./SliderData";
import ImageSlider from "./ImageSlider";

const friends = () => {
    return (
        //<div className='flex flex-wrap flex-row items-center mt-2 bg-orange-400'>
        //<div className='mx-10 my-5 p-10 bg-orange-500'>

        <div>
            <div className="text-4xl font-bold text-orange-900 text-left mt-12 ml-10 mr-10">
                <h1 className="mb-4 ml-4">Following</h1>
                <div className="p-5 bg-orange-400 rounded-3xl">
                    <div className="flex flex-col items-center w-full">
                        <ImageSlider slides={SliderData} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default friends;
