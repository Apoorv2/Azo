import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";
import FooterSmall from "components/Footers/FooterSmall.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import Formdetails from "views/auth/Formdetails";
import Choice from "views/auth/Choice";
import Thirdpageform from "views/auth/Thirdpageform";
import Facebookaccess from "views/auth/facebookaccess";
import Credentials from "views/auth/Credentials";
import CreatePassword from "views/auth/CreatePassword";
import ForgotPassword from "../views/auth/ForgotPassword";
import PostForm from "../views/auth/PostForm";
export default function Auth() {
  return (
    <>
      <main>
        <section className="relative w-full h-full py-40 min-h-screen">
          <div
            className="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
            style={{
              backgroundImage:
                "url(" + require("assets/img/register_bg_2.png").default + ")",
            }}
          ></div>
          <Switch>
            <Route path="/auth/login" exact component={Login} />
            <Route path="/auth/register" exact component={Register} />
            <Route  path="/auth/Formdetails" exact component={Formdetails}/>
            <Route path="/auth/Choice" exact component={Choice}/>
            <Route path="/auth/Thirdpageform" exact component={Thirdpageform}/>
            <Route path="/auth/facebookaccess" exact component={Facebookaccess}/>
            <Route path="/auth/credentials" exact component={Credentials}/>
            <Route path="/auth/createPassword" exact component={CreatePassword}/>
            <Route path="/auth/forgotPassword" exact component={ForgotPassword}/>
            <Route path="/auth/postForm" exact component={PostForm}/>
            <Redirect from="/auth" to="/auth/login" />
          </Switch>
          <FooterSmall absolute />
        </section>
      </main>
    </>
  );
}
