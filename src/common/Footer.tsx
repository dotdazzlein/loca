import React from "react";
import {
  FaApple,
  FaGooglePlay,
  FaInstagram,
  FaFacebookF,
  FaYoutube,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">

        {/* Brand */}
        <h2 className="text-xl font-bold text-gray-900 tracking-wide">
          HYPERCONNECT<span className="align-super text-xs">®</span>
        </h2>

        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-gray-600">
          <span className="font-semibold">MatchGroup</span>
          <span className="text-gray-400">·</span>
          <span>FAMILY</span>
        </div>

        {/* Links */}
        <div className="mt-8 text-sm text-gray-600 leading-relaxed">
          <p className="flex flex-wrap justify-center gap-x-2 gap-y-1">
            <span className="cursor-pointer hover:text-gray-900">About Snack</span>|
            <span className="cursor-pointer hover:text-gray-900">Blog</span>|
            <span className="cursor-pointer hover:text-gray-900">Snack Guide</span>|
            <span className="cursor-pointer hover:text-gray-900">Safety tips</span>|
            <span className="cursor-pointer hover:text-gray-900">Community Guidelines</span>|
            <span className="cursor-pointer hover:text-gray-900">Terms</span>|
            <span className="font-semibold text-gray-900 cursor-pointer">Privacy</span>|
            <span className="cursor-pointer hover:text-gray-900">CCPA Addendum</span>|
            <span className="cursor-pointer hover:text-gray-900">Customer Service</span>|
            <span className="cursor-pointer hover:text-gray-900">Cookie Policy</span>|
            <span className="cursor-pointer hover:text-gray-900">Your Privacy Choices</span>
          </p>
        </div>

        {/* Company info */}
        <p className="mt-6 text-sm text-gray-500">
          CEO : Kim Linda Su Ah | Email : help@Snacklive.com | Address : 517,
          Yeongdong-daero, Gangnam-gu, Seoul | Business Number : 220-88-75836
        </p>

        <p className="mt-3 text-sm text-gray-400">
          © 2026 Hyperconnect LLC. All rights reserved.
        </p>

        {/* App Store Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-gray-900 font-medium">
            <FaApple className="text-xl" />
            App Store
          </button>

          <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition text-gray-900 font-medium">
            <FaGooglePlay className="text-xl" />
            Google Play
          </button>
        </div>

        {/* Social Icons */}
        <div className="mt-10 flex justify-center gap-6">
          <SocialIcon icon={<FaInstagram />} />
          <SocialIcon icon={<FaFacebookF />} />
          <SocialIcon icon={<FaYoutube />} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* ---------- Social Icon ---------- */
const SocialIcon = ({ icon }: { icon: React.ReactNode }) => {
  return (
    <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition">
      {icon}
    </div>
  );
};
