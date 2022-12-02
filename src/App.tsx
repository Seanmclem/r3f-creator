import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { MainUI } from "./pages/MainUI";

const App = () => {
  return (
    <MantineProvider>
      <Router>
        <Switch>
          <Route path="/" exact>
            <MainUI />
          </Route>
        </Switch>
      </Router>
    </MantineProvider>
  );
};

export default App;
