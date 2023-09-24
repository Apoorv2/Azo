// src/components/FormDetails.js
import React, { useState,useEffect } from "react";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { getAnalytics, logEvent } from "firebase/analytics";
function FormDetails() {
 useEffect(() => {
   const analytics = getAnalytics();
   logEvent(analytics, 'screen_view', {
     firebase_screen: 'Form Page 2',
     //firebase_screen_class: screenClass
   });
  }, []);
  const history = useHistory();
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [duration, setDuration] = useState(7); // Default duration of 7 days
  const [platform, setPlatform] = useState("");

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(parseInt(e.target.value));
  };

  const handlePlatformChange = (e) => {
    setPlatform(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Combine the form data
    //const adDetails = { startDate, duration, platform };

    // Send the adDetails to Firebase Firestore
    // try {
    //   const adDetailsCollectionRef = collection(db, "users");
    //   const newAdDetailsDocRef = doc(adDetailsCollectionRef);

    //   await addDoc(newAdDetailsDocRef, {
    //     ...adDetails,
    //     timestamp: Timestamp.fromDate(new Date()), // Include a timestamp if needed
    //   });

    //   // Call the onSubmit function passed from the parent component
    //   onSubmit(adDetails);
    // } catch (error) {
    //   console.error("Error adding document: ", error);
    // }

    Cookies.set("startDate",startDate);
    Cookies.set("duration",duration);
    Cookies.set("plateform",platform);
    history.push("/auth/Thirdpageform");
  };

  useEffect(() => {
    // Retrieve user input data from cookies
    const savedStartDate = Cookies.get('startDate');
    const savedDuration = Cookies.get('duration');
    const savedPlateform = Cookies.get('plateform');
    
  
    // Set the input field values with the retrieved data
    if (savedStartDate) {
      setStartDate(savedStartDate);
    }
    if (savedDuration) {
      setDuration(savedDuration);
    }
    if (savedPlateform) {
      setPlatform(savedPlateform);
    }
  }, []);

  return (
    <div className="container mx-auto px-4 h-full">
      <div className="flex content-center items-center justify-center h-full">
        <div className="w-full lg:w-6/12 px-4">
          <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
            <div className="rounded-t mb-0 px-6 py-6">
              <div className="text-center mb-3">
                <h6 className="text-blueGray-500 text-sm font-bold">
                  Enter Ad Details
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="start-date"
                  >
                    Start Date <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    required
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="duration"
                  >
                    Duration (in days) <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="number"
                    id="duration"
                    value={duration}
                    onChange={handleDurationChange}
                    min="1"
                    required
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>

                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="platform"
                  >
                    Platform for Advertising <span className="text-red-300">*</span>
                  </label>
                  <select
                    id="platform"
                    value={platform}
                    onChange={handlePlatformChange}
                    required
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Select Platform</option>
                    <option value="facebook">Facebook</option>
                    <option value="google">Google</option>
                  </select>
                </div>
                <button
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Next
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormDetails;
