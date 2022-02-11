import React from "react";

import {BrowserRouter,Route,Switch} from 'react-router-dom'
import AuthPage from "./PAGES/AuthPage";
import PrincipalePage from "./PAGES/PrincipalePage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path = "/signin" exact >
          <AuthPage connexionType = "login"/>
        </Route>
        <Route path = "/signup" exact >
          <AuthPage connexionType = "signup"/>
        </Route>
        <Route path = "/">
          <PrincipalePage/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;
