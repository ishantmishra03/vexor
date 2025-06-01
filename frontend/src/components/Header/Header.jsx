import React from "react";
import { BsStars } from "react-icons/bs";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";

const Header = () => {
  const handleConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="w-full flex flex-col items-center pt-40 md:pt-36 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onClick={handleConfetti}
        className="bg-[#cd9cff]/70 px-4 py-2 rounded-xl flex items-center gap-2 text-[#0c193e] backdrop-blur-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer mb-8"
      >
        <span className="font-medium">New: AI feature integrated</span>
        <BsStars className="text-[#6a00ff] animate-pulse" />
      </motion.div>

      <div className="text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#585858]">
          <div className="">
            Your <span className="text-[#9a36ff]">blog,</span>
          </div>
          <div>your voice</div>
        </h1>
        <div className="mt-5 text-[#6E6E6E] text-xl">
          <div>Not just a blog - a command line for your thoughts.</div>
          <div>Welcome to Vexor.</div>
        </div>
      </div>

      <div className="relative mt-6 w-full max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search for blogs"
          className="w-full pr-28 pl-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder-gray-400"
        />
        <button className="absolute right-1 top-1 bottom-1 px-4 bg-[#9a36ff] text-white rounded-md hover:bg-purple-700 transition-all cursor-pointer">
          Search
        </button>
      </div>
    </div>
  );
};

export default Header;
