import { SliderData } from "./SliderData";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import React, { useState } from "react";

const ImageSlider = ({ slides }) => {
    const [current, setCurrent] = useState(0);
    const length = slides.length;

    const nextSlide = () => {
        setCurrent(current === length - 8 ? 0 : current + 1);
    };

    const prevSlide = () => {
        setCurrent(current === 0 ? length - 8 : current - 1);
    };

    return (
        <section className="slider flex flex-wrap items-center">
            <FaArrowAltCircleLeft
                className="text-5xl mr-7"
                onClick={prevSlide}
            />
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={
                            index === current
                                ? "opacity-100 flex flex-wrap"
                                : " flex flex-wrap opacity-100"
                        }
                        key={index}
                    >
                        <div className="flex flex-wrap flex-col items-center">
                            {index === current && (
                                <img
                                    src={slide.image}
                                    className="h-28 w-28 rounded-full mr-9"
                                />
                            )}
                            {index === current && (
                                <p className="text-2xl">{slide.name}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col items-center">
                            {index === current + 1 && (
                                <img
                                    src={slide.image}
                                    className="h-28 w-28 rounded-full mr-9"
                                />
                            )}
                            {index === current + 1 && (
                                <p className="text-2xl">{slide.name}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col items-center">
                            {index === current + 2 && (
                                <img
                                    src={slide.image}
                                    className="h-28 w-28 rounded-full mr-9"
                                />
                            )}
                            {index === current + 2 && (
                                <p className="text-2xl">{slide.name}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col items-center">
                            {index === current + 3 && (
                                <img
                                    src={slide.image}
                                    className="h-28 w-28 rounded-full mr-9"
                                />
                            )}
                            {index === current + 3 && (
                                <p className="text-2xl">{slide.name}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col items-center">
                            {index === current + 4 && (
                                <img
                                    src={slide.image}
                                    className="h-28 w-28 rounded-full mr-9"
                                />
                            )}
                            {index === current + 4 && (
                                <p className="text-2xl">{slide.name}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col items-center">
                            {index === current + 5 && (
                                <img
                                    src={slide.image}
                                    className="h-28 w-28 rounded-full mr-9"
                                />
                            )}
                            {index === current + 5 && (
                                <p className="text-2xl">{slide.name}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col items-center">
                            {index === current + 6 && (
                                <img
                                    src={slide.image}
                                    className="h-28 w-28 rounded-full mr-9"
                                />
                            )}
                            {index === current + 6 && (
                                <p className="text-2xl">{slide.name}</p>
                            )}
                        </div>

                        <div className="flex flex-wrap flex-col items-center">
                            {index === current + 7 && (
                                <img
                                    src={slide.image}
                                    className="h-28 w-28 rounded-full mr-7"
                                />
                            )}
                            {index === current + 7 && (
                                <p className="text-2xl">{slide.name}</p>
                            )}
                        </div>
                    </div>
                );
            })}
            <FaArrowAltCircleRight className="text-5xl" onClick={nextSlide} />
        </section>
    );
};

export default ImageSlider;
