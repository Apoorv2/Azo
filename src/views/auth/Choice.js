import React, { useState,useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
import Cookies from 'js-cookie';
import { getAnalytics, logEvent } from "firebase/analytics";

async function checkUserInfo(uid, userInfoTableRef, adminTableRef, history) {
  const q = query(userInfoTableRef, where("uid", "==", uid));
  const q1 = query(adminTableRef, where("uid", "==", uid));

  try {
    const [querySnapshot, querySnapshot1] = await Promise.all([getDocs(q), getDocs(q1)]);

    
    if (!querySnapshot.empty || !querySnapshot1.empty) {
      history.push("/admin");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function Choice() {

useEffect(() => {
  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: 'Choice Page',
    //firebase_screen_class: screenClass
  });
 }, []);
  console.log("login: " + Cookies.get("logged_in"));
  console.log("user_uid: " + Cookies.get("uid"));
  const history = useHistory();
  const userInfoTableRef = collection(db, "userInfo");
  const adminTableRef = collection(db, "admin");
  const uid = Cookies.get("uid");
  const [showPopup, setShowPopup] = useState(false);

  // useEffect(() => {
  //   if (!Cookies.get("logged_in")) {
  //     history.push("/");
  //   } else {
  //     // Check if UID is undefined
  //     if (uid === undefined || uid == null) {
  //       // Render content when UID is undefined
  //       return;
  //     }

  //     // Call the async function
  //     checkUserInfo(uid, userInfoTableRef, adminTableRef, history);
  //   }
  // }, [history, uid, userInfoTableRef, adminTableRef]);
 const handleCall = (e) => {
   setShowPopup(true);
   setTimeout(() => setShowPopup(false ),5000);
     const analytics = getAnalytics();
       logEvent(analytics, 'button_click', {
         button_name: 'book_call_button',
       });
 }
  const handleFillSubmit = (e) => {
      const analytics = getAnalytics();
        logEvent(analytics, 'button_click', {
          button_name: 'fill_the_form_button',
        });
  }


  const handleFormSubmit = (e) => {
    e.preventDefault();

    // if (e.target.name === "bookCallButton") {
    //   // Show the popup when the "Book a call" button is clicked
    //   setShowPopup(true);
      
    //   // Automatically hide the popup after 5 seconds
    //   setTimeout(() => {
    //     setShowPopup(false);
    //     history.push("/");
    //   }, 5000);

    //   // You can add additional logic here, such as making API calls to book a call.
    // } 
  };
  console.log("popUp: "+showPopup);
  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold"></h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleFormSubmit}>
                <button onClick={handleCall}
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                  name="bookCallButton" // Add a name attribute to identify the button
                >
                  Book a call
                </button>
                {showPopup && (
                  <div className="bg-white text-black border rounded p-4 mb-4" style={{ display: 'block' }}>
                    Our executive will connect with you within 24 hours.
                  </div>
                )}
                <Link to="/auth/register">
                  <button onClick = {handleFillSubmit}
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                    name="fillFormButton" 
                  >
                    Fill the form
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Choice;
