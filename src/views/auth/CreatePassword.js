import React, { useState , useEffect} from "react";
import { useHistory, Link } from "react-router-dom";
import { db } from "../../firebase-config";
import {collection, query, where, getDocs, updateDoc, addDoc, Timestamp} from "firebase/firestore";
import Cookies from "js-cookie";
import { getAnalytics, logEvent } from "firebase/analytics";

export default function CreatePassword() {
useEffect(() => {
  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: 'CreatePassword Page',
    //firebase_screen_class: screenClass
  });
 }, []);
  const [password, setPassword] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const credentailsTableRef = collection(db, "credentials");
  const [errorMessage, setErrorMessage] = useState("");
  const fullPhoneNumber = Cookies.get("phoneNumber");
  const userInfoTableRef = collection(db, "userInfo");
  const uid=Cookies.get("uid");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
    if (password === confirmPassword && email.length> 0 && privacyPolicy) {
      console.log(privacyPolicy);
      if(passwordRegex.test(password)) {


        // Check if the phone number is already in the table
        // const q = query(credentailsTableRef, where("phoneNumber", "==", fullPhoneNumber));
        // const querySnapshot = await getDocs(q);
        const currentTimeStamp = Timestamp.now();
        const dataAdditionDate = new Date(currentTimeStamp.seconds * 1000);

        // if (querySnapshot.size === 1) {
        //   // Update the password for the existing user
        //   const userDoc = querySnapshot.docs[0];
        //   const uid = userDoc.get("uid"); // Replace "uid" with the actual field name where you store the UID
        //
        //   await updateDoc(userDoc.ref, { password });
        //
        //   Cookies.set("logged_in", true);
        //   Cookies.set("uid", uid);
        //   const q1 = query(userInfoTableRef, where("uid", "==", uid));
        //   const querySnapshot1 = await getDocs(q1);
        //   if(querySnapshot1.size ===0) {
        //     history.push("/auth/choice");
        //   }
        //   else {
        //     history.push("/");
        //   }
        // } else {
        // Add a new user with the provided phone number and password
        const newUser = {
          phoneNumber: fullPhoneNumber,
          password: password,
          email: email,
          uid: uid,
          dataAdditionDate: dataAdditionDate
          // Add other user data here if needed
        };

        const docRef = await addDoc(credentailsTableRef, newUser);
       // const uid = docRef.get("uid");
        Cookies.set("logged_in", true);
       // Cookies.set("uid", uid);

        // Redirect to the desired page (e.g., the user dashboard)
        history.push("/auth/choice");
      }
      else {
        setErrorMessage("Enter Password with atleast 6 characters,1 letter and 1 number");
      }
    } else if(!privacyPolicy) {
      // Passwords do not matchUT
      setErrorMessage("Please acknowledge the Privacy Policy and T&C");
      // You can display an error message to the user if needed
    }
    else {
      setErrorMessage("Passwords do not match");
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
                  Set Up Account
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
                <div className="mb-4">
                  <label className="block text-blueGray-600 text-sm font-bold mb-2">
                    Email <span className="text-red-300">*</span>
                  </label>
                  <input
                      type="email"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                      placeholder="Enter Email"
                      value={email}
                      onChange={handleEmailChange}
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
                    placeholder="Enter Password"
                    id="password"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    placeholder="Confirm Password"
                    id="confirmPassword"
                  />
                </div>
                <div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                        id="customCheckLogin"
                        value={privacyPolicy}
                        onChange={(e) => setPrivacyPolicy(e.target.checked)}
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                    />
                    <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                      <Link
                          to="/privacypolicy"
                          className="text-lightBlue-500"
                      >
                          Privacy Policy
                        </Link>
                      and{" "}
                      <Link
                          to="/tandc"
                          className="text-lightBlue-500"

                      >
                          Terms & Conditions
                        </Link>
                      </span>
                  </label>
                </div>

                <div className="text-center mt-6">
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Create Account
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
