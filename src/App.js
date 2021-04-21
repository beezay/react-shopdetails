import { Route, Switch } from "react-router";
import Dashboard from "./components/HomePage/Dashboard";
import AddMall from "./components/MallPage/AddMall";

const App = () => {
  return (
    <>
      <Switch>
      <Route exact path="/" render={()=> <Dashboard/>} />
      <Route exact path="/addMall" render={()=> <AddMall/>} />
        {/* <Dashboard /> */}
      </Switch>
    </>
  );
};

export default App;
