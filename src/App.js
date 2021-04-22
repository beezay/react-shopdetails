import {useState} from 'react'
import { Route, Switch, withRouter } from "react-router";
import Dashboard from "./components/HomePage/Dashboard";
import Malls from "./components/HomePage/Malls";
import Shops from "./components/HomePage/Shops";
import AddMall from "./components/MallPage/AddMall";
import MallsDetails from './components/MallPage/MallsDetails';

const App = () => {

  // const [showSearchbar, setShowSearchbar] = useState(false)

  return (
    <>
      <Switch>
        <Route exact path="/" render={() => <Dashboard showSearchbar='false' />} />
        <Route path="/addMall" render={() => <AddMall />} />
        <Route path="/malls/:id" render={() => <MallsDetails/> } />
        <Route exact path="/malls" render={() => <Malls  />} />
        <Route path="/shops" render={() => <Shops />} />
        {/* <Dashboard /> */}
      </Switch>
    </>
  );
};

export default withRouter(App);
