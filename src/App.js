import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, withRouter } from "react-router";
import LoginAdmin from "./components/Admin/LoginAdmin";
import Navbar from "./components/Admin/Navbar";
import RegisterAdmin from "./components/Admin/RegisterAdmin";
import Dashboard from "./components/HomePage/Dashboard";
import Malls from "./components/HomePage/Malls";
import Shops from "./components/HomePage/Shops";
import AddMall from "./components/MallPage/AddMall";
import MallsDetails from "./components/MallPage/MallsDetails";
import { fireStore } from "./firebase/firebase";
import { fetchMalls } from "./redux/MallSlice";

const App = () => {
  // const [showSearchbar, setShowSearchbar] = useState(false)
  const dispatch = useDispatch();

  useEffect(() => {
    const data = fireStore
      .collection("mallInfo")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          dispatch({
            type: fetchMalls,
            payload: doc.data(),
          });
        });
      }, []);

    console.log(data);
  });

  return (
    <>
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => <Dashboard showSearchbar="false" />}
        />
        <Route path="/addMall" render={() => <AddMall />} />
        <Route path="/malls/:id" render={() => <MallsDetails />} />
        <Route exact path="/malls" render={() => <Malls />} />
        <Route path="/shops" render={() => <Shops />} />
        <Route path="/admin/register" render={() => <RegisterAdmin />} />
        <Route path="/admin/login" render={() => <LoginAdmin />} />
        {/* <Dashboard /> */}
      </Switch>
    </>
  );
};

export default withRouter(App);
