import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";



import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

import Admin from "layouts/Admin.js";
import Auth from "layouts/Auth.js";
import PrivacyPolicy from "views/PrivacyPolicy.js";
import TandC from "views/TandC.js";

// views without layouts

import Landing from "views/Landing.js";
import Profile from "views/Profile.js";
import Index from "views/Index.js";
import TableComparison from "views/TableComparison";
import Cookies from 'js-cookie';
import Aboutus from "views/Aboutus";
import AdminForm from "views/AdminForm";
Cookies.set("logged_in", false);
Cookies.set("uid", null);
Cookies.set("isAdmin", false);



ReactDOM.render(
  <BrowserRouter>
    <Switch>
      {/* add routes with layouts */}
      <Route path="/admin" component={Admin} />
      <Route path="/auth" component={Auth} />
      {/* add routes without layouts */}
      <Route path="/landing" exact component={Index} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/" exact component={Landing} />
      <Route path="/aboutus" exact component={Aboutus} />
      <Route path="/privacypolicy" exact component={PrivacyPolicy} />
      <Route path="/tandc" exact component={TandC} />
      <Route path="/adminform" exact component={AdminForm} />
      <Route path="/tableCompare" exact component={TableComparison}/>
      {/* add redirect for first page */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
