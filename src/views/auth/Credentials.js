import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom"; // Import Link for "Sign Up" and "Forgot Password" links
import { authentication, db } from "../../firebase-config";
import { collection, query, where, getDocs } from "firebase/firestore";
import Cookies from "js-cookie";

export default function Credentials() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState("");
  const credentialsTableRef = collection(db, "credentials");
  const adminTableRef= collection(db, "admin");
  const userInfoTableRef = collection(db,"userInfo");
  const countryCode = "+91";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phone.length === 10 && password) {
      const fullPhoneNumber = countryCode + phone;
      const q = query(
        credentialsTableRef,
        where("phoneNumber", "==", fullPhoneNumber),
        where("password", "==", password)
      );
      const querySnapshot = await getDocs(q);

      if (querySnapshot.size === 1) {
        // User found with the provided phone number and password
        const userDoc = querySnapshot.docs[0];
        const uid = userDoc.get("uid"); // Replace "uid" with the actual field name where you store the UID
        Cookies.set("logged_in", true);
        Cookies.set("uid", uid);
        Cookies.set("phoneNumber", fullPhoneNumber);
        const q1 = query(adminTableRef, where("uid", "==", uid));
        const querySnapshot1 = await getDocs(q1);

        const q2 = query(userInfoTableRef, where("uid", "==", uid));
        const querySnapshot2 = await getDocs(q2);
        if (querySnapshot1.size != 0) {
          Cookies.set("isAdmin", true);
          history.push("/adminform");
        } 
        else if (querySnapshot2.size==0)
        {
          history.push("/auth/choice");
        }
        else {
          // Redirect to the desired page (e.g., the user dashboard)
          history.push("/");
        }
      } else {
        // User not found or invalid credentials
        setErrorMessage("Invalid credentials");
        // You can display an error message to the user if needed
      }
    }
  };

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-4/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Authenticate with Username and Password
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              {errorMessage && (
                  <div className="text-red-500 text-center mb-4">
                    {errorMessage}
                  </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="phone"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Enter Phone Number"
                    id="phone"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Password"
                    id="password"
                  />
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </form>
              {/*<div className="text-center mt-4">*/}
              {/*  /!* Style the "Sign Up" button within a blue box *!/*/}
              {/*  <Link to="/signup">*/}
              {/*    <button className="bg-blueGray-600 text-white active:bg-blue-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1">*/}
              {/*      Sign Up*/}
              {/*    </button>*/}
              {/*  </Link>*/}
              {/*  /!* Add a link to the "Forgot Password" page *!/*/}
              {/*  <Link to="/forgot-password" className="text-blueGray-500 hover:text-blueGray-700">*/}
              {/*    Forgot Password?*/}
              {/*  </Link>*/}
              {/*</div>*/}
            </div>
          </div>
          <div className="flex flex-wrap mt-6 relative" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div className="w-1/2">
              <Link to="/auth/login.js" className="text-blueGray-200">
                <small>Forgot Password</small>
              </Link>
            </div>

            <div className="w-1/2 text-right">
              <Link to="/auth/login.js" className="text-blueGray-200">
                <small>Create new account</small>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
