import React from "react";
import { FaInstagram } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const FooterIcons = () => {
    return (
        <div className="text-2xl">
            <a href="https://mail.google.com/" target="_blank">
                <SiGmail />
            </a>
            <a href="https://www.instagram.com/" target="_blank">
                <FaInstagram />
            </a>
        </div>
    );
};

export default FooterIcons;
