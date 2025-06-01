import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full min-h-screen">
      <div className="w-20 h-20 border-4 border-transparent text-purple-400 text-4xl animate-spin flex items-center justify-center border-t-purple-400 rounded-full">
        <div className="w-16 h-16 border-4 border-transparent text-violet-400 text-2xl animate-spin flex items-center justify-center border-t-violet-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
