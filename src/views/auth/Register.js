import React, { useState,useEffect } from "react";
import { collection, addDoc } from "firebase/firestore";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import { db } from "../../firebase-config";

export default function Register() {
  const [name, setName] = useState("");
  const [industry, setIndustry] = useState("");
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState("");
  const [currentStep, setCurrentStep] = useState(1); // Manage the current step
  const history = useHistory();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleIndustryChange = (e) => {
    setIndustry(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep === 1) {
      // First step: Save business information
      if (name.length > 0 && industry.length > 0 && email.length > 0 && url.length > 0) {
        Cookies.set('businessName', name);
        Cookies.set('industry', industry);
        Cookies.set('emailID', email);
        Cookies.set('website', url);
        // const Uid = Cookies.get("uid");
        // const PhoneNumber = Cookies.get("phoneNumber");
        // const userTableRef = collection(db, "users");
        // await addDoc(userTableRef, {
        //   uid: Uid,
        //   phoneNumber: PhoneNumber,
        //   businessName: name,
        //   industry: industry,
        //   emailID: email,
        //   website: url,
        // });

        // Navigate to the next step
        setCurrentStep(2);
        history.push("/auth/Formdetails")
      }
    } else if (currentStep === 2) {
      // Second step: Navigate to the next page
      history.push("/auth/Thirdpageform");
    }
  };

  useEffect(() => {
    // Retrieve user input data from cookies
    const savedBusinessName = Cookies.get('businessName');
    const savedIndustry = Cookies.get('industry');
    const savedEmail = Cookies.get('emailID');
    const savedWebsite = Cookies.get('website');
  
    // Set the input field values with the retrieved data
    if (savedBusinessName) {
      setName(savedBusinessName);
    }
    if (savedIndustry) {
      setIndustry(savedIndustry);
    }
    if (savedEmail) {
      setEmail(savedEmail);
    }
    if (savedWebsite) {
      setUrl(savedWebsite);
    }
  }, []);
  

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    {currentStep === 1
                      ? "Enter Your Business Information"
                      : "Enter Ad Details"}
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                {currentStep === 1 ? (
                  <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                      <label className="block text-blueGray-600 text-sm font-bold mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Enter Business Name"
                        value={name}
                        onChange={handleNameChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-blueGray-600 text-sm font-bold mb-2">
                        Industry
                      </label>
                      <select
                    id="industry"
                    value={industry}
                    onChange={handleIndustryChange}
                    required
                    className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  >
                    <option value="">Select Industry</option>
  <option value="Automobile">Automobile</option>
  <option value="Banking and Finance">Banking and Finance</option>
  <option value="Education and Training">Education and Training</option>
  <option value="Events and Entertainment">Events and Entertainment</option>
  <option value="Fashion and Lifestyle">Fashion and Lifestyle</option>
  <option value="Fitness and Health">Fitness and Health</option>
  <option value="Food and Restaurant">Food and Restaurant</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Home Decor and Construction">Home Decor and Construction</option>
  <option value="Hospitality">Hospitality</option>
  <option value="Insurance">Insurance</option>
  <option value="Marketing/ Advertising/ Agency">Marketing/ Advertising/ Agency</option>
  <option value="Marketplaces">Marketplaces</option>
  <option value="NonProfit">NonProfit</option>
  <option value="Social Enterprise">Social Enterprise</option>
  <option value="Online Digital Business">Online Digital Business</option>
  <option value="Professional Services">Professional Services</option>
  <option value="Real Estate">Real Estate</option>
  <option value="Retail">Retail</option>
  <option value="E-commerce">E-commerce</option>
  <option value="SaaS">SaaS</option>
  <option value="Software/ IT/ ITES">Software/ IT/ ITES</option>
  <option value="Telecom">Telecom</option>
  <option value="Transportation and Logistics">Transportation and Logistics</option>
  <option value="Travel and Tourism">Travel and Tourism</option>
  <option value="Others">Others</option>
</select>

                    </div>
                    <div className="mb-4">
                      <label className="block text-blueGray-600 text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Enter Email"
                        value={email}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-blueGray-600 text-sm font-bold mb-2">
                        Website Link
                      </label>
                      <input
                        type="url"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Enter Website Link"
                        value={url}
                        onChange={handleUrlChange}
                      />
                    </div>
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Next
                    </button>
                  </form>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
