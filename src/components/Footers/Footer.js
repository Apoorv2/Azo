import React from "react";
import {Link} from "react-router-dom";
export default function Footer() {
  return (
    <>
      <footer className="relative bg-blueGray-200 pt-8 pb-6">
        <div
          className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
          style={{ transform: "translateZ(0)" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-blueGray-200 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap text-center lg:text-left">
            <div className="w-full lg:w-6/12 px-4">
              <h4 className="text-3xl font-semibold">Let's keep in touch!</h4>
              <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
                Azo (registered as Urban Serv Express Pvt. Ltd.)
                CIN U74140DL2015PTC283749
                D10/6, First Floor, Ardee City, Sector 52, Gurugram, Haryana 122003
                Phone: 8287350714
                Support@azoapp.in
              </h5>
               <div className="mt-6 lg:mb-0 mb-6">
                {/*<button*/}
                {/*  className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"*/}
                {/*  type="button"*/}
                {/*>*/}
                {/*  <i className="fab fa-twitter"></i>*/}
                {/*</button>*/}
                {/*<button*/}
                {/*  className="bg-white text-lightBlue-600 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"*/}
                {/*  type="button"*/}
                {/*>*/}
                {/*  <i className="fab fa-facebook-square"></i>*/}
                {/*</button>*/}
                {/*<button*/}
                {/*   className="bg-white text-pink-400 shadow-lg font-normal h-10 w-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2"*/}
                {/*  type="button"*/}
                {/*>*/}
                {/*  <i className="fab fa-dribbble"></i>*/}
                {/*</button>*/}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="flex flex-wrap items-top mb-6">
                <div className="w-full lg:w-4/12 px-4 ml-auto">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Useful Links
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        
                      >
                      <Link to ="/aboutus">
                        About Us
                        </Link>
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        //href="https://blog.creative-tim.com?ref=nr-footer"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="w-full lg:w-4/12 px-4">
                  <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
                    Other Resources
                  </span>
                  <ul className="list-unstyled">
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        href="https://docs.google.com/document/d/1bRR52G7A7B7O5aXuM_l5RC0SFRP0y_wn/"
                      >
                        <Link to={"/tandc"}>
                        Terms & Conditions
                        </Link>
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"

                      ><Link to={"/privacypolicy"}>
                        Privacy Policy
                      </Link>
                      </a>
                    </li>
                    <li>
                      <a
                        className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                        
                      ><Link to={"/auth/credentails"}>
                        Contact Us
                      </Link>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-6 border-blueGray-300" />
          <div className="flex flex-wrap items-center md:justify-between justify-center">
            <div className="w-full md:w-4/12 px-4 mx-auto text-center">
              <div className="text-sm text-blueGray-500 font-semibold py-1">
                Copyright © {new Date().getFullYear()} AZO Powered by{" "}
                <a

                  className="text-blueGray-500 "
                >
                Urban Serv Express Pvt. Ltd.
                </a>

              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
