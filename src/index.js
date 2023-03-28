import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "rsuite/dist/rsuite.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/animate.min.css";
import "./assets/scss/light-bootstrap-dashboard-react.scss?v=2.0.0";
import "./assets/css/demo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Context from "CommonUtils/Utils";
import AdminLayout from "layouts/Admin.js";
import Login from "views/Auth/Login";
import PageNotFound from "customComponents/PageNotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={(props) => <Login {...props} />} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Route
          path="/admin/dashboard"
          render={(props) => <AdminLayout {...props} />}
        />
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="*" render={(props) => <PageNotFound {...props} />} />
        
      </Switch>
    </BrowserRouter>
  </Context>
);
