import { Route, Switch } from "react-router";
import Dashboard from "./components/HomePage/Dashboard";
import Malls from "./components/HomePage/Malls";
import Shops from "./components/HomePage/Shops";
import AddMall from "./components/MallPage/AddMall";

const App = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Dashboard />} />
        <Route path="/addMall" render={() => <AddMall />} />
        <Route path="/malls" render={() => <Malls />} />
        <Route path="/shops" render={() => <Shops />} />
        {/* <Dashboard /> */}
      </Switch>
    </>
  );
};

export default App;
