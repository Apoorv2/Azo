import React, {useState} from "react";
import { collection , addDoc, query, where, getDocs} from "firebase/firestore";
import { ReactSession } from 'react-client-session';
import { useHistory } from "react-router-dom";
import {db} from "../../firebase-config";

export default function Register() {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [desc,setDesc] = useState('');
  const history   = useHistory();
  const handleSubmit = (e)=>{
    if(name.length>0 && email.length>0 )
    {
      console.log(name);
      console.log(email);
      console.log(desc);
      let Uid=ReactSession.get("uid");
      let PhoneNumber=ReactSession.get("phoneNumber");
      const userTableRef = collection(db, "users");
      addDoc(userTableRef, {uid: Uid, phoneNumber: PhoneNumber, businessName: name, emailID: email,businessDesc: desc});
      history.push("/admin");
    }
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
                    Enter Your Business Information
                  </h6>
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
                      Business Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Business Name"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e)=>setEmail(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                      htmlFor="grid-password"
                    >
                      Business Description
                    </label>
                    <input
                      type="text"
                      value={desc}
                      onChange={(e)=>setDesc(e.target.value)}
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Will be used by AI to generate campaigns"
                    />
                  </div>



                  <div className="text-center mt-6">
                    <button
                      className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
