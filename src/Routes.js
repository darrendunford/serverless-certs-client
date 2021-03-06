import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
import NewCert from "./containers/NewCert";
import Certs from "./containers/Certs";
import Settings from "./containers/Settings";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />

      <UnauthenticatedRoute
        path="/login"
        exact
        component={Login}
        appProps={appProps}
      />
      <UnauthenticatedRoute
        path="/signup"
        exact
        component={Signup}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/settings"
        exact
        component={Settings}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/certs/new"
        exact
        component={NewCert}
        appProps={appProps}
      />
      <AuthenticatedRoute
        path="/certs/:id"
        exact
        component={Certs}
        appProps={appProps}
      />

      {/* Finally, catch all unmatched routes  */}
      <Route component={NotFound} />
    </Switch>
  );
}
