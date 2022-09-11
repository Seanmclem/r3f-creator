import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MainUI } from "./pages/MainUI";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <MainUI />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
