import "./App.css";
import MakeUser from "./MakeUser";
import MakeGroup from "./MakeGroup";
import AddUserToG from "./AddUserToG";
import AddDeg from './Degree'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import io from "socket.io-client";
import CWS from './AllStuC'
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
const AdminP = ({ setLoggedin, Loggedin }) => {
    const history=useHistory()
    if(Loggedin=="false"){
        history.push('/Login')
    }else{
        console.log("Hello");
    }
  return (
    <div className="App">
      <Router>
        <div className="Links">
          <Link className="btn btn-primary w-25" to="/makeuser">
            Make New User
          </Link>
          <Link className="w-25 btn btn-primary" to="/ALLSC">See Student</Link>
          <Link className="w-25 btn btn-primary" to="/MakeGroup">
            Make New Group
          </Link>
          <Link className="w-25 btn btn-primary" to="/AdduserG">
            Add User To Group
          </Link>
          <Link className="w-25 btn btn-primary" to="/AddDeg">
            Edit Student Degree
          </Link>
        </div>
        <Switch>
          <Route path="/AddDeg">
            <Route path="/ALLSC">
              <CWS />
            </Route>
            <AddDeg />
          </Route>
          <Route path="/makeuser">
            <MakeUser />
          </Route>
          <Route path="/MakeGroup">
            <MakeGroup />
          </Route>
          <Route path="/AdduserG">
            <AddUserToG />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default AdminP;
