import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { collection , addDoc, query, where, getDocs} from "firebase/firestore";
import { db } from "../../firebase-config";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';

async function Choice() {
  const history = useHistory();
  const userInfoTableRef = collection(db, "userInfo");

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };
  
  console.log(Cookies.get("logged_in"));
  if (!Cookies.get("logged_in")) {
    history.push("/");
  }
  if(Cookies.get("isAdmin")){
    history.push("/admin")
  }
   
  const q = query(userInfoTableRef, where("uid", "==",Cookies.get("uid")));
  const querySnapshot = await getDocs(q);
  let userInfocnt = 0;
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    userInfocnt++;
  });
  if(userInfocnt > 0)
  {
    history.push("/admin")
  }

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                  </h6>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form onSubmit={handleFormSubmit}>
                  <button
                    className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    type="submit"
                  >
                    Book a call
                  </button>
                  <Link to="/auth/register">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
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
    </>
  );
}

export default Choice;
