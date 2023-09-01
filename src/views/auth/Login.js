import React, {useState,useEffect} from "react";
import { authentication ,db } from "../../firebase-config";
import { signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { collection , addDoc, query, where, getDocs} from "firebase/firestore";
import Cookies from 'js-cookie';
import { useHistory } from "react-router-dom";

export default function Login() {
  const [otpSent,setOtpSent] = useState(false);
  const [phone,setPhone] = useState('');
  const [otp,setOtp] = useState('');
  const history   = useHistory();
  const userTableRef = collection(db, "users");
  const OTPTableRef = collection(db, "generatedOTP");
  const adminTableRef= collection(db, "admin");

  const generateRecaptcha = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier(authentication, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.

      }
    });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      if (otpSent === false) {
        generateRecaptcha();
        let appVerifier = window.recaptchaVerifier;
        signInWithPhoneNumber(authentication, phone, appVerifier).then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
        }).catch((error) => {
          console.log(error);
        });
        const q = query(OTPTableRef, where("phoneNumber", "==", phone));
        const querySnapshot = await getDocs(q);
        let phoneNumbercnt = 0;
        querySnapshot.forEach((doc) => {
          phoneNumbercnt++;
        });
        if(phoneNumbercnt===0)
        {
          await addDoc(OTPTableRef, {
            phoneNumber: phone,
          });
        }
        setOtpSent(true);
      } else {
        if (otp.length === 6) {
          let confirmationResult = window.confirmationResult;
          confirmationResult.confirm(otp).then(async (result) => {
            const user = result.user;
            Cookies.set("logged_in", true);
            Cookies.set("uid", user.uid);

            const q = query(userTableRef, where("uid", "==", user.uid));
            const querySnapshot = await getDocs(q);
            let usercnt = 0;
            querySnapshot.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              usercnt++;
            });
            // if (cnt > 0) {
            //   history.push("/admin");
            // } else {
            //   history.push("/auth/register");
            // }
            //addDoc(userTableRef, {uid: user.uid, phoneNumber: user.phoneNumber})
            //console.log(user.uid)
            if(usercnt===0)
            {
              await addDoc(userTableRef, {
                uid: user.uid,
                phoneNumber: user.phoneNumber,
              });
            }
            const q1 = query(adminTableRef, where("uid", "==", user.uid));
            const querySnapshot1 = await getDocs(q1);
            let Admincnt = 0;
            querySnapshot1.forEach((doc) => {
              // doc.data() is never undefined for query doc snapshots
              Admincnt++;
            });
            if(Admincnt>0)
            {
              Cookies.set("isAdmin", true);
            }
            console.log(usercnt);
            console.log(Admincnt);
            console.log(Cookies.get("uid"));
            history.push("/auth/choice");
          }).catch((error) => {
            console.log(error);
          });
        }
      }
    }
  }

  console.log(Cookies.get("logged_in"));
  if(Cookies.get("logged_in"))
  {
    history.push("/");
  }
  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Authenticate with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

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
                      placeholder="Enter Phone Number with Country Code"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    {
                        otpSent && <div>
                        <label
                            className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                            htmlFor="grid-password"
                        >
                          Enter 6 digit OTP
                        </label>
                        <input
                            type="number"
                            value={otp}
                            onChange={(e)=>setOtp(e.target.value)}
                            className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                            placeholder="OTP"
                        />
                      </div>
                    }
                  </div>


                  {!otpSent && <div className="text-center mt-6">
                    {
                      <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type={"submit"}
                      >
                        Get OTP
                      </button>
                    }
                  </div>}
                  {otpSent && <div className="text-center mt-6">
                    {
                      <button
                          className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                          type={"submit"}
                      >
                        Verify OTP
                      </button>
                    }
                  </div>}
                  <div id="recaptcha-container"></div>
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