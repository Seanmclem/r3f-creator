import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Exporter } from "./pages/Exporter";
// import { FormCreator } from "./pages/FormCreator";
import { MainUI } from "./pages/MainUI";

const App = () => {
  return (
    <Router>
      {/* <nav>
          <ul>
            <li>
              <Link to="/about">About</Link>
            </li>
        </nav> */}

      {/* Routes, why? One day? why? */}
      <Switch>
        <Route path="/" exact>
          <MainUI />
        </Route>
        <Route path="/ast1" exact>
          <Exporter />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
