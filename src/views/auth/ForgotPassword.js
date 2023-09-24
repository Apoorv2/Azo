import React, {useState,useEffect} from "react";
import { authentication ,db } from "../../firebase-config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { collection , addDoc, query, where, getDocs, Timestamp} from "firebase/firestore";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import * as emailjs from "@emailjs/browser";
import { getAnalytics, logEvent } from "firebase/analytics";


export default function ForgotPassword() {
useEffect(() => {
  const analytics = getAnalytics();
  logEvent(analytics, 'screen_view', {
    firebase_screen: 'forgot password',
    //firebase_screen_class: screenClass
  });
 }, []);

    const [phone,setPhone] = useState('');
    const history   = useHistory();
    const generatedOTPTableRef = collection(db, "generatedOTP");
    const userTableRef = collection(db, "users");
    const credentialsTableRef = collection(db, "credentials");
    const adminTableRef= collection(db, "admin");
    const countryCode = "+91";
    const [errorMessage, setErrorMessage] = useState("");
    const [redirectMessage, setRedirectMessage] = useState("");
    const [emailData, setEmailData] = useState({
        to: '',
        subject: '',
        text: '',
    });

    const setEmailDataField = (fieldName, value) => {
        setEmailData({
            ...emailData,
            [fieldName]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (phone.length=== 10) {
            const fullPhoneNumber = countryCode + phone;
            const q = query(
                credentialsTableRef,
                where("phoneNumber", "==", fullPhoneNumber)
            );
            const querySnapshot = await getDocs(q);
            //console.log(querySnapshot);
            if (querySnapshot.size > 0 ) {
                const userDoc = querySnapshot.docs[0];
                // const user_email = userDoc.get("email");
                let templateParams = {
                    reply_to: userDoc.get("email"),
                    message: userDoc.get("password")
                };
                console.log("sending Email")
                emailjs.send('service_thovrin', 'template_u1holma', templateParams,'NTBb8q0NNjm0bWork')
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                    }, function(error) {
                        console.log('FAILED...', error);
                    });
                setErrorMessage("")
                setRedirectMessage("The Password had been sent to your registered mail.Redirecting to Login Page in 3s");
                setTimeout(() => history.push('/auth/credentials'),3000);
            }
            else {
                setErrorMessage("You Entered a Number Not Registered with Us")
            }
        }
        else {
            setErrorMessage("Enter a Valid 10 digit Phone Number")
        }
    };


    // console.log("login: "+ Cookies.get("logged_in"));
    // if(Cookies.get("logged_in"))
    // {
    //   history.push("/");
    // }
    return (
        <>
            <div className="container mx-auto px-4 h-full">
                <div className="flex content-center items-center justify-center h-full">
                    <div className="w-full lg:w-4/12 px-4">
                        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
                            <div className="rounded-t mb-0 px-6 py-6">
                                <div className="text-center mb-3">
                                    <h6 className="text-blueGray-500 text-sm font-bold">
                                        Retrieve Password
                                    </h6>
                                </div>
                                <div className="btn-wrapper text-center">
                                </div>
                                <hr className="mt-6 border-b-1 border-blueGray-300" />
                            </div>
                            <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                                {errorMessage && (
                                    <div className="text-red-500 text-center mb-4">
                                        {errorMessage}
                                    </div>
                                )}
                                {redirectMessage && (
                                    <div className="text-center mb-4">
                                        {redirectMessage}
                                    </div>
                                )}
                                <form onSubmit={handleSubmit}>
                                    <div className="relative w-full mb-3">
                                        <label
                                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            htmlFor="grid-password"
                                        >
                                            Phone Number
                                        </label>
                                        <input
                                            type="phone"
                                            value={phone}
                                            onChange={(e)=>setPhone(e.target.value)}
                                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                            placeholder="Enter Phone Number"
                                        />
                                    </div>
                                    <button
                                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                                        type={"submit"}
                                    >
                                        Retrieve Password
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="flex flex-wrap mt-6 relative">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}