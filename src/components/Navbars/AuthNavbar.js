/*eslint-disable*/
import React , { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// components

import PagesDropdown from "components/Dropdowns/PagesDropdown.js";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import logo from './AzoLogo.png';


export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const [login, setLogin] = useState(false);
  const history = useHistory();

  // useEffect(() => {
  //   // This effect runs when 'login' state changes
  //   // Update cookies and local storage when 'login' state changes
  //   console.log("handleclick");
  //   console.log("login: "+ login)
  //   console.log(Cookies.get("logged_in"))
  //   if (Cookies.get("logged_in")) {
  //     Cookies.set("logged_in", "true");
  //     setLogin(true);
  //     console.log(login)
  //     console.log(Cookies.get("logged_in"))
  //   } else {
  //     Cookies.remove("logged_in");
  //     Cookies.remove("uid");
  //     Cookies.remove("isAdmin");
  //     setLogin(false);
  //     console.log("login: "+ login)
  //     console.log(Cookies.get("logged_in"))
  //   }
  // }, [login]); //

  const handleclick = () => {
    if (!login) {
      history.push("/auth/credentials");
    } else {
      setLogin(false);
      history.push("/");
    }
  };

  // const handleclick = () => {
  //   console.log("handleclick");
  //   console.log("login")
  //   console.log("Login: "+Cookies.get("logged_in"))

  //   if (!login) {
  //     // Set cookies and login state to indicate the user is logged in
  //     Cookies.set("logged_in", "true");
  //     setLogin(true);
  //     localStorage.setItem("login", "true");
  //     history.push("/auth/login");
  //     console.log("login")
  //     console.log(Cookies.get("logged_in"))
  //   } else {
  //     // Clear cookies and set login state to indicate the user is logged out
  //     Cookies.remove("logged_in");
  //     Cookies.remove("uid");
  //     Cookies.remove("isAdmin");
  //     setLogin(false);
  //     localStorage.setItem("login", "false");
  //     console.log("login")
  //     console.log(Cookies.get("logged_in"))
  //     history.push("/");
  //   }
  // };
  

  return (
    <>
      <nav className="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">

            <Link
              className="text-white text-xl font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              to="/"
            ><div className="flex items-center">
              <img src={logo} className="h-8 mr-2" alt="Logo" />AZO
            </div>
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {/*<li className="flex items-center">*/}
              {/*</li>*/}
              {/*<li className="flex items-center">*/}
              {/*  <a*/}
              {/*    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"*/}
              {/*   // href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"*/}
              {/*    target="_blank"*/}
              {/*  >*/}
              {/*    <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-facebook text-lg leading-lg " />*/}
              {/*    <span className="lg:hidden inline-block ml-2">Share</span>*/}
              {/*  </a>*/}
              {/*</li>*/}

              {/*<li className="flex items-center">*/}
              {/*  <a*/}
              {/*    className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"*/}
              {/*   // href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"*/}
              {/*    target="_blank"*/}
              {/*  >*/}
              {/*    <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-twitter text-lg leading-lg " />*/}
              {/*    <span className="lg:hidden inline-block ml-2">Tweet</span>*/}
              {/*  </a>*/}
              {/*</li>*/}
              <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                >
                  <Link to="/aboutus">About Us</Link>
                </a>
              </li>

              {/* <li className="flex items-center">
                <a
                  className="lg:text-white lg:hover:text-blueGray-200 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://github.com/creativetimofficial/notus-react?ref=nr-auth-navbar"
                  target="_blank"
                >
                  <i className="lg:text-blueGray-200 text-blueGray-400 fab fa-github text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Star</span>
                </a>
              </li> */}
              <li className="flex items-center">
                <button onClick={handleclick}
                  className="bg-white text-blueGray-700 active:bg-blueGray-50 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
                  type="button">
                  <i >
                    {
                      !login ? <div>Log In</div> : <div>Log out</div>
                    }
                  </i>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
