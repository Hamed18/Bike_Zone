import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaGooglePlusSquare,
} from "react-icons/fa";
import { Link } from "react-router-dom";
type SocialMediaLink = {
  to: string;
  icon: React.ReactNode;
  alt: string;
};

import logo from "@/assets/logo-white.svg";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const Footer = () => {
  const socialLinks: SocialMediaLink[] = [
    {
      to: "/",
      icon: <FaFacebookSquare className="text-2xl" />,
      alt: "Facebook",
    },
    { to: "/", icon: <FaTwitterSquare className="text-2xl" />, alt: "Twitter" },
    {
      to: "/",
      icon: <FaGooglePlusSquare className="text-2xl" />,
      alt: "Google+",
    },
  ];
  return (
    <div className="bg-black text-white">
      <div className="max-w-7xl md:py-14 py-8 mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {/* Logo Section */}
          <div className="space-y-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 md:w-14 md:h-14"
              />
              <h2 className="flex flex-col justify-center uppercase">
                <span className="font-bold text-xl md:text-3xl">Bike Zone</span>
                <span className="-mt-1 font-normal text-xs md:text-sm tracking-widest">
                  Upgrade your ride
                </span>
              </h2>
            </div>
          </div>
          <div className="flex flex-col sm:items-center">
            <div>
              <p className="text-white font-bold sm:block">CONTACT</p>
              <ul className="my-2 space-y-1">
                <li className="flex items-center gap-1">
                  <MdEmail /> info@bikeshop.com{" "}
                </li>
                <li className="flex items-center gap-1">
                  <MdPhone /> +61 400 000 000{" "}
                </li>
                <li className="flex items-center gap-1">
                  <MdLocationOn /> Dhaka,Bangladesh{" "}
                </li>
              </ul>
            </div>
          </div>
          {/* Social Media Section */}
          <div className="flex sm:flex-row flex-col sm:justify-end sm:gap-4 gap-2">
            <p className="text-white font-bold sm:block">SOCIAL MEDIA</p>
            <div className="flex">
              {socialLinks.map((link, index) => (
                <Link key={index} to={link.to} className="hover:text-primary">
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Copyright Section */}
      <div className="text-center sm:text-base text-xs p-2 bg-gray-900">
        <p className="text-white opacity-90 w-full ">
          Copyright © {new Date().getFullYear()}. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
