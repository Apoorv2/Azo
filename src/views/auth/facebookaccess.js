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
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const addPageToBusinessManager = async (userAccessToken, pageId) => {
  // Make a request to add the Page to Business Manager
  try {
    const response = await fetch(`https://graph.facebook.com/v17.0/316435194090120/client_pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        page_id: pageId,
        permitted_tasks: '["ADVERTISE", "ANALYZE"]',
        access_token: userAccessToken,
      }),
    });
    const data = await response.json();
    console.log("Response from Facebook for Page ID " + pageId + ":", data);
  }
  catch (error) {
    console.error("Error making Facebook API request for Page ID " + pageId + ":", error);
  }
};
    
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
        if (response.status == "connected"){
          const userAccessToken = response.authResponse.accessToken;
         
          const apiVersion = 'v17.0'; // Use the desired API version

//Make a GET request to the /me/adaccounts endpoint
window.FB.api(`/${apiVersion}/me/adaccounts`, 'GET', { access_token: userAccessToken }, function(response) {
  if (response && !response.error) {
    // The response will contain an array of ad accounts associated with the user
    const adAccounts = response.data;

    if (adAccounts.length > 0) {
      // Assuming you want to retrieve the first ad account ID
      const firstAdAccountID = adAccounts[0].id;
      console.log('Ad Account ID:', firstAdAccountID);
    } else {
      console.log('No ad accounts found for the user.');
    }
  } else {
    console.error('Error:', response.error);
  }
});

          window.FB.api("/me/accounts", function (pagesResponse) {
            if (pagesResponse.data) {
              console.log("pageResponse:"+ pagesResponse)
              const pageIds = pagesResponse.data.map((page) => page.id);
  
              // Log the Page IDs to the console
              console.log("Page IDs:", pageIds);
              let iterate =0
              pageIds.forEach((pageId) => {
                console.log(pageId)
                 setTimeout(() => addPageToBusinessManager(userAccessToken, pageId),30000*iterate);
                 iterate=iterate+1;
                 console.log(iterate);
                // Your cURL request as a JavaScript fetch request
                // await sleep(5000); 
                // fetch("https://graph.facebook.com/v17.0/316435194090120/client_pages", {
                //   method: "POST",
                //   headers: {
                //     "Content-Type": "application/x-www-form-urlencoded",
                //   },
                //   body: new URLSearchParams({
                //     page_id: pageId,
                //     permitted_tasks: '["ADVERTISE", "ANALYZE"]',
                //     access_token: userAccessToken,
                //   }),
                // })
                //   .then((response) => response.json())
                //   .then((data) => {
                //     console.log("Response for Page ID " + pageId + ":", data);
                //   });
                  });
            } else {
              console.error("Error retrieving user's Pages.");
            }
          });
        }
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
          config_id: '690992619596801',
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