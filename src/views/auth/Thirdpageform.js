import React, { useState, useEffect } from "react";
import { addDoc, collection, doc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase-config";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { getStorage, ref, uploadBytes,getDownloadURL } from 'firebase/storage';

function Thirdpageform({ onSubmit }) {
  const history   = useHistory();
  const storage = getStorage();
  const [locations, setLocations] = useState([""]); // An array to store up to 5 locations
  const [file, setFile] = useState(null);
  const [fileDownloadURL, setFileDownloadURL] = useState(null);
  const [handleUpload, setHandleUpload] = useState(false);
  const [headline, setHeadline] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [cta, setCta] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const [dailyBudget, setDailyBudget] = useState(500); // Default daily budget
  console.log(Cookies.get("logged_in"))
  // useEffect(() => {
  //   // Check if FB object exists (from the SDK)
  //   if (typeof FB !== "undefined") {
  //     window.FB.init({
  //       appId: "834829788226350",
  //       cookie: true,
  //       xfbml: true,
  //       version: "v17.0",
  //     });
  //   }
  // }, []);
  const handleFileChange = async (e) => {
    // Handle the selected file
    setFile(e.target.files[0]);
  };
  useEffect(() => {
    // Upload and get download URL when 'file' changes
    const uploadFile = async () => {
      if (file) {
        const storageRef = ref(storage, file.name);
        await uploadBytes(storageRef, file);
  
        // Get the download URL of the uploaded file
        const url = await getDownloadURL(storageRef);
        setFileDownloadURL(url); // Update the state with the download URL
      }
    };
  
    uploadFile(); // Call the function when 'file' changes
  }, [file]); // Listen for changes in 'file'
  
  const handleHandleUploadChange = (e) => {
    setHandleUpload(e.target.checked);
  };

  const handleHeadlineChange = (e) => {
    setHeadline(e.target.value);
  };

  const handleAdDescriptionChange = (e) => {
    setAdDescription(e.target.value);
  };

  const handleCtaChange = (e) => {
    setCta(e.target.value);
  };

  const handleAgeGroupChange = (e) => {
    setAgeGroup(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleDailyBudgetChange = (e) => {
    setDailyBudget(e.target.value);
  };

  const handleLocationChange = (e, index) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = e.target.value;
    setLocations(updatedLocations);
  };

  const addLocationField = () => {
    if (locations.length < 5) {
      setLocations([...locations, ""]);
    }
  };

  const removeLocationField = (index) => {
    const updatedLocations = [...locations];
    updatedLocations.splice(index, 1);
    setLocations(updatedLocations);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Combine the form data
    const currentTimeStamp = Timestamp.now();
    const date = new Date(currentTimeStamp.seconds * 1000); // Convert seconds to milliseconds

    const adDetails = {
      uid: Cookies.get("uid"),
      phoneNumber: Cookies.get("phoneNumber"),
      businessName: Cookies.get("businessName") || "", // Retrieve from cookies
      industry: Cookies.get("industry") || "", // Retrieve from cookies
      emailID: Cookies.get("emailID") || "", // Retrieve from cookies
      website: Cookies.get("website") || "", // Retrieve from cookies
      startDate: Cookies.get("startDate") || "", // Retrieve from cookies
      duration: Cookies.get("duration") || "", // Retrieve from cookies
      platform: Cookies.get("plateform") || "",
      locations: locations.filter((location) => location.trim() !== ""), // Remove empty locations
      fileDownloadURL: fileDownloadURL,
      handleUpload: handleUpload,
      headline: headline,
      adDescription: adDescription,
      cta: cta,
      ageGroup: ageGroup,
      gender: gender,
      dailyBudget: dailyBudget,
      date: date
    };

    // Store form data in cookies
    Cookies.set("adDetails", JSON.stringify(adDetails));

    // Send the adDetails to Firebase Firestore
    try {
      const adDetailsCollectionRef = collection(db, "userInfo");
      const newAdDetailsDocRef = doc(adDetailsCollectionRef);
      const docRef = await addDoc(adDetailsCollectionRef, adDetails);
      console.log("Document added in userInfo with ID: ", docRef.id);
      console.log("time of data addition: "+ date.toISOString());

      history.push("/admin");

      // Move the window.FB.login call outside of the Firestore block
      // window.FB.login(
      //   function (response) {
      //     if (response.authResponse) {
      //       // User has logged in successfully
      //       // You can perform further actions here, e.g., fetch user data
      //       console.log("User logged in:", response);
      //
      //       // Check if the user granted the required permissions
      //       if (
      //         response.authResponse.grantedScopes.includes("ads_management") &&
      //         response.authResponse.grantedScopes.includes("ads_read")
      //       ) {
      //         // The user granted both "ad_management" and "ad_read" permissions
      //         // Proceed with your ad management logic here
      //       } else {
      //         // The user did not grant the required permissions
      //         console.log("User did not grant required permissions.");
      //       }
      //     } else {
      //       // User canceled login or didn't authorize the app
      //       console.log(
      //         "User canceled login or did not authorize the app."
      //       );
      //     }
      //   },
      //   { scope: "ads_management,ads_read", return_scopes: true }
      // );
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  useEffect(() => {
    // Retrieve user input data from cookies
    const savedAdDetails = Cookies.get("adDetails");

    if (savedAdDetails) {
      const parsedAdDetails = JSON.parse(savedAdDetails);
      setLocations(parsedAdDetails.locations);
      setFile(parsedAdDetails.file);
      setHandleUpload(parsedAdDetails.handleUpload);
      setHeadline(parsedAdDetails.headline);
      setAdDescription(parsedAdDetails.adDescription);
      setCta(parsedAdDetails.cta);
      setAgeGroup(parsedAdDetails.ageGroup);
      setGender(parsedAdDetails.gender);
      setDailyBudget(parsedAdDetails.dailyBudget);
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
                  Ad Details
                </h6>
              </div>
              <hr className="mt-6 border-b-1 border-blueGray-300" />
            </div>
            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
              <form onSubmit={handleSubmit}>
                {/* File Upload */}
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="file-upload"
                  >
                    Upload Image/Video/Carousel (Max 5 MB)
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-blueGray-600 text-white active:bg-blueGray-800 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  >
                    {file ? `File Selected: ${file.name}` : "Select File"}
                  </label>
                </div>
                {/* Handling Uploads Checkbox */}
                <div className="mb-3 flex items-center">
                  <input
                    type="checkbox"
                    id="handle-upload"
                    checked={handleUpload}
                    onChange={handleHandleUploadChange}
                    className="mr-2 leading-tight"
                  />
                  <label
                    htmlFor="handle-upload"
                    className="text-blueGray-600 text-sm font-bold"
                  >
                    Let us handle the upload
                  </label>
                </div>
                {/* Headline */}
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="headline"
                  >
                    Ad Headline
                  </label>
                  <input
                    type="text"
                    id="headline"
                    value={headline}
                    onChange={handleHeadlineChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>
                {/* Ad Description */}
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="ad-description"
                  >
                    Ad Description
                  </label>
                  <textarea
                    id="ad-description"
                    value={adDescription}
                    onChange={handleAdDescriptionChange}
                    rows="4"
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full resize-none ease-linear transition-all duration-150"
                  ></textarea>
                </div>
                {/* Call to Action (CTA) */}
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="cta"
                  >
                    Call to Action (CTA)
                  </label>
                  <select
                    id="cta"
                    value={cta}
                    onChange={handleCtaChange}
                    required
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Select CTA</option>
                    <option value="Subscribe">Subscribe</option>
                    <option value="Apply Now">Apply Now</option>
                    <option value="Book Now">Book Now</option>
                    <option value="Get Offer">Get Offer</option>
                    <option value="Get Quote">Get Quote</option>
                    <option value="Learn More">Learn More</option>
                    <option value="Sign Up">Sign Up</option>
                    <option value="Sign Up">Other</option>
                  </select>
                </div>
                {/* Age Group */}
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="age-group"
                  >
                    Target Audience Age <span className="text-red-300">*</span>
                  </label>
                  <select
                    id="age-group"
                    value={ageGroup}
                    onChange={handleAgeGroupChange}
                    required
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Select Age Group</option>
                    <option value="<18">&lt;18</option>
                    <option value="18-44">18-44</option>
                    <option value=">44">&gt;44</option>
                  </select>
                </div>
                {/* Gender */}
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="gender"
                  >
                    Target Audience Gender <span className="text-red-300">*</span>
                  </label>
                  <select
                    id="gender"
                    value={gender}
                    onChange={handleGenderChange}
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {/* Location Fields */}
                {locations.map((location, index) => (
                  <div className="relative w-full mb-3" key={index}>
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor={`location-${index}`}
                    >
                      Location {index + 1} <span className="text-red-300">*</span>
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id={`location-${index}`}
                        value={location}
                        onChange={(e) => handleLocationChange(e, index)}
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      />
                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => removeLocationField(index)}
                          className="ml-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none"
                        >
                          -
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addLocationField}
                  className="mb-3 bg-blueGray-500  text-blueGray-600 active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-2 rounded-full hover:bg-blueGray-600 focus:outline-none"
                >
                  Add Location 
                </button>
                {/* Daily Budget */}
                <div className="relative w-full mb-3">
                  <label
                    className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                    htmlFor="daily-budget"
                  >
                    Daily Budget (in Rupees) <span className="text-red-300">*</span>
                  </label>
                  <input
                    type="number"
                    id="daily-budget"
                    value={dailyBudget}
                    onChange={handleDailyBudgetChange}
                    min="0"
                    step="1"
                    required
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  />
                </div>

                {/* Submit Button */}
                <button
                  className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                  type="submit"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thirdpageform;
