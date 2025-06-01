import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">
          <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">
            <Link to="/" className="flex justify-center lg:justify-start w-44 h-auto">
              <img src="/logo.png" alt="Vexor" className="w-full h-full" />
            </Link>
            <p className="py-8 text-sm text-gray-500 lg:max-w-xs text-center lg:text-left">
              Trusted in more than 100 countries & 5 million customers. Have any query?
            </p>
            <a
              href="javascript:;"
              className="py-2.5 px-5 h-9 block w-fit bg-[#9a36ff] rounded-full shadow-sm text-xs text-white mx-auto transition-all  hover:bg-[#6e4f8d]  lg:mx-0"
            >
              Contact us
            </a>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">Vexor</h4>
            <ul className="text-sm transition-all duration-500">
              <li className="mb-6"><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Home</a></li>
              <li className="mb-6"><a href="javascript:;" className="text-gray-600 hover:text-gray-900">About</a></li>
              <li className="mb-6"><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
              <li><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Features</a></li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">Products</h4>
            <ul className="text-sm transition-all duration-500">
              <li className="mb-6"><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Figma UI System</a></li>
              <li className="mb-6"><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Icons Assets</a></li>
              <li className="mb-6"><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Responsive Blocks</a></li>
              <li><a href="javascript:;" className="text-gray-600 hover:text-gray-900">Components Library</a></li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left">
            <h4 className="text-lg text-gray-900 font-medium mb-7">Resources</h4>
          </div>
        </div>
      </div>

      <div className="border-t border-t-black/10 flex justify-center items-center w-full p-5 text-gray-500">
        Copyright 2025 © Vexor - All Right Reserved.
      </div>
    </footer>
  );
};

export default Footer;
