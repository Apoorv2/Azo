import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { collection , addDoc, query, where, getDocs, Timestamp} from "firebase/firestore";
import { authentication ,db } from "../../firebase-config";
import Cookies from "js-cookie";
export default function Facebookaccess() {
  const history = useHistory();
  const userAdAcountInfoTableRef = collection(db, "userAdAccountInfo");
useEffect(() => {
  // Check if FB object exists (from the SDK)
  if (typeof FB !== "undefined") {
    window.FB.init({
      appId: "1000730281143859",
      cookie: true,
      xfbml: true,
      version: "v17.0",
    });
  }
}, []);

const handleFormSubmit = (e) => {
  e.preventDefault();
   const currentTimeStamp = Timestamp.now();
   const dataAdditionDate = new Date(currentTimeStamp.seconds * 1000);
  window.FB.login(
     function (response) {
      if (response.authResponse) {
        // User has logged in successfully
        // You can perform further actions here, e.g., fetch user data
        console.log("User logged in:", response);
        const data = {
          uid: Cookies.get("uid"),
          response: response,
          dataAdditionDate: dataAdditionDate
        };
        addDoc(userAdAcountInfoTableRef, data)
          .then((docRef) => {
            console.log("Document added with ID: ", docRef.id);
            // Now you can proceed with further actions if needed
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
        // try {
        //   const docRef = await addDoc(userAdAcountInfoTableRef, data);
        //   console.log("Document added with ID: ", docRef.id);
        // } catch (error) {
        //   console.error("Error adding document: ", error);
        // }
        // Check if the user granted the required permissions
      //   if (
      //     response.authResponse.grantedScopes.includes("ads_management") &&
      //     response.authResponse.grantedScopes.includes("ads_read")
      //   ) {
      //     // The user granted both "ad_management" and "ad_read" permissions
      //     // Proceed with your ad management logic here
      //   } else {
      //     // The user did not grant the required permissions
      //     console.log("User did not grant required permissions.");
      //   }
      // } else {
      //   // User canceled login or didn't authorize the app
      //   console.log(
      //     "User canceled login or did not authorize the app."
      //   );
       }

    },
    // { scope: "ads_management,ads_read", return_scopes: true }
    {
          config_id: '845744570288594',
    }
       
  );


  history.push("/");
  
};

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
              <button
                className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                type="submit"
              >
                Connect facebook
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);

}