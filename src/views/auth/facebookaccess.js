import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import { collection , addDoc, query, where, getDocs, Timestamp} from "firebase/firestore";
import { authentication ,db } from "../../firebase-config";
import Cookies from "js-cookie";
import { getAnalytics, logEvent } from "firebase/analytics";

export default function Facebookaccess() {
 useEffect(() => {
   const analytics = getAnalytics();
   logEvent(analytics, 'screen_view', {
     firebase_screen: 'FacebookAccess Page',
     //firebase_screen_class: screenClass
   });
  }, []);
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
        permitted_tasks: '["ADVERTISE", "ANALYZE", "CREATE_CONTENT"]' ,
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
   const postContentToPage = async (PageAccessToken, pageId) => {
     // Make a request to post content on the Page's feed
     try {

       const response = await fetch(`https://graph.facebook.com/v17.0/${pageId}/photos`, {
         method: "POST",
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
         body: new URLSearchParams({
           message: "Test post message apoorv",
           access_token: PageAccessToken,
           url: "https://firebasestorage.googleapis.com/v0/b/azotech-a09f1.appspot.com/o/Azo%20Logo.png?alt=media&token=c823b24c-56b4-45ab-b9ee-8dc01c6f2485"
         }).toString(),
       });
       const data = await response.json();
       console.log("Response from Facebook for Page ID " + pageId + ":", data);
     } catch (error) {
       console.error("Error making Facebook API request for Page ID " + pageId + ":", error);
     }
   };

  const exchangeShortLivedToken = async (userAccessToken ) => {
    try {
      const response = await fetch(
          `https://graph.facebook.com/v17.0/oauth/access_token?grant_type=fb_exchange_token&client_id=1000730281143859&client_secret=261a9545fc66b22d17270cfa8da74a36&fb_exchange_token=${userAccessToken}`,
          {
            method: 'GET'
          }
      );

      if (!response.ok) {
        throw new Error(`Failed to exchange token: ${response.status}`);
      }

      const data = await response.json();

      // Extract the long-lived token from the response
      const longLivedToken = data.access_token;

      // Now you can use the long-lived token as needed

      console.log(`Long-lived token: ${longLivedToken}`);
      return longLivedToken;
    } catch (error) {
      console.error(`Error exchanging token: ${error.message}`);
    }
  };


  const getPageAccessToken = async (userAccessToken, pageId) => {
  try {
    // Make a request to get the user's Pages
    const response = await fetch(`https://graph.facebook.com/v17.0/me/accounts`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${userAccessToken}`,
      },
    });
    const data = await response.json();

    // Find the Page with the specified pageId
    const page = data.data.find((page) => page.id === pageId);

    if (!page) {
      console.error(`Page with ID ${pageId} not found.`);
      return null;
    }
    console.log("page access token: "+ page.access_token)
    // Extract and return the Page access token
    return page.access_token;

  } catch (error) {
    console.error("Error fetching Page access token:", error);
    return null;
  }
};


    
const handleFormSubmit = async (e) => {
  e.preventDefault();
   const currentTimeStamp = Timestamp.now();
   const dataAdditionDate = new Date(currentTimeStamp.seconds * 1000);

  window.FB.login(
      function (response) {
       if (response.authResponse) {
         // User has logged in successfully
         // You can perform further actions here, e.g., fetch user data
         console.log("User logged in:", response);
         if (response.status == "connected") {
           const userAccessToken = response.authResponse.accessToken;

           const apiVersion = 'v17.0'; // Use the desired API version

// Make a GET request to the /me/adaccounts endpoint
// window.FB.api(`/${apiVersion}/me/adaccounts`, 'GET', { access_token: userAccessToken }, function(response) {
//   if (response && !response.error) {
//     // The response will contain an array of ad accounts associated with the user
//     const adAccounts = response.data;
//
//     if (adAccounts.length > 0) {
//       // Assuming you want to retrieve the first ad account ID
//       const firstAdAccountID = adAccounts[0].id;
//       console.log('Ad Account ID:', firstAdAccountID);
//        // Replace with your actual app access token
////          const YOUR_APP_ID = '1000730281143859';
////            const YOUR_APP_SECRET = '261a9545fc66b22d17270cfa8da74a36';
////
////            // Construct the URL for obtaining the app access token
////            const apiUrl = 'https://graph.facebook.com/oauth/access_token?client_id=1000730281143859&client_secret=261a9545fc66b22d17270cfa8da74a36&grant_type=client_credentials';
////            let appAccessToken = null
////            // Make the GET request to obtain the app access token
////            fetch(apiUrl)
////              .then((response) => response.json())
////              .then((data) => {
////                appAccessToken = data.access_token;
////                if (appAccessToken) {
////                  console.log('App Access Token:', appAccessToken);
////
////                  // Proceed with your logic here, including adding the ad account to Business Manager
////                } else {
////                  console.error('Failed to obtain App Access Token.');
////                }
////              })
////              .catch((error) => {
////                console.error('Error:', error);
////              });
////           const businessManagerID = '316435194090120'; // Replace with your Business Manager ID
////
////           // Make a POST request to add the ad account to Business Manager
////           fetch('https://graph.facebook.com/v17.0/316435194090120/adaccounts', {
////             method: 'POST',
////             headers: {
////               'Content-Type': 'application/json',
////             },
////             body: JSON.stringify({
////               adaccount_id: firstAdAccountID,
////               access_token: appAccessToken,
////             }),
////           })
////             .then((response) => response.json())
////             .then((data) => {
////               console.log('Response for adding Ad Account:', data);
////             })
////             .catch((error) => {
////               console.error('Error adding Ad Account:', error);
////             });
//     } else {
//       console.log('No ad accounts found for the user.');
//     }
//   } else {
//     console.error('Error:', response.error);
//   }
// });

           window.FB.api("/me/accounts", async function (pagesResponse) {
             if (pagesResponse.data) {
               console.log("pageResponse:" + pagesResponse)
               const pageIds = pagesResponse.data.map((page) => page.id);

               // Log the Page IDs to the console
               console.log("Page IDs:", pageIds);
               let iterate = 1
               const userAccessLongLivedToken = await exchangeShortLivedToken(userAccessToken);
               for (const pageId of pageIds) {
                 console.log(pageId)
//                 //setTimeout(() => addPageToBusinessManager(userAccessToken, pageId),30000*iterate);
//                 let PageAccessToken = setTimeout(() => getPageAccessToken(userAccessToken, pageId),5000*iterate);
//                 setTimeout(() => postContentToPage(PageAccessToken, pageId),10000*iterate);
//                 iterate=iterate+1;
//                 console.log(iterate);
                 try {

                   const pageAccessToken = await getPageAccessToken(userAccessLongLivedToken, pageId);
                   if (pageAccessToken) {
                     //await postContentToPage(pageAccessToken, pageId);
                     console.log(`Posted to Page ID ${pageId}`);
                   } else {
                     console.error(`Failed to obtain Page Access Token for Page ID ${pageId}`);
                   }
                 } catch (error) {
                   console.error(`Error for Page ID ${pageId}:`, error);
                 }
                 iterate = iterate + 1;
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
               }
             } else {
               console.error("Error retrieving user's Pages.");
             }
           });
         }
//        const data = {
//          uid: Cookies.get("uid"),
//          response: response,
//          dataAdditionDate: dataAdditionDate
//        };
//        addDoc(userAdAcountInfoTableRef, data)
//          .then((docRef) => {
//            console.log("Document added with ID: ", docRef.id);
//            // Now you can proceed with further actions if needed
//          })
//          .catch((error) => {
//            console.error("Error adding document: ", error);
//          });
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
    //{ scope: "ads_management,business_management,ads_read", return_scopes: true }
      {
          config_id: '620203213621709',
          return_scopes: true
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