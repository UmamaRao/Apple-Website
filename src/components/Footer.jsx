import React from "react";
import { footerLinks } from "../constants";

const Footer = () => {
  return (
    <div className="max-screen-width">
      <div>
        <p className="font-semibold text-gray-500 text-xs">
          More ways to shop:{" "}
          <span className="underline text-blue-300">Find an Apple Store</span>{" "}
          or <span className="underline text-blue-300">other retailer</span>{" "}
          near you.
        </p>
        <p className="font-semibold text-gray-500 text-xs">
          Or call 000800-040-1966
        </p>
      </div>
      <div className="bg-neutral-500 my-5 h-[1px] w-full" />
      <div className="flex md:flex-row flex-col md:items-center justify-between">
        <p className="font-semibold text-gray-500 text-xs">
          Copyright @ 2025 Apple Inc. All rights are reserved.
        </p>
        <div className="flex">
          {footerLinks.map((link, i) => (
            <p key={link} className="font-semibold text-gray-500 text-xs">
              {link}{" "}
              {i !== footerLinks.length - 1 && (
                <span className="mx-2"> | </span>
              )}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
