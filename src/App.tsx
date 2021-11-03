import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FormCreator } from "./pages/FormCreator";
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

      <Switch>
        <Route path="/">
          <MainUI />
        </Route>
        <Route path="/ast1">
          <FormCreator />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
