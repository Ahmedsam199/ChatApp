
import './App.css';
import MakeUser from './MakeUser';
import MakeGroup from './MakeGroup';
import AddUserToG from './AddUserToG';
import AdminP from './AdminP';
import  Example  from './aa';
import io from "socket.io-client";
import RandomP from './TheRandomPage'
import CRUD from './firebaseCRUD';
import Private from './Private';
import CWS from './AllStuC';
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from 'axios';
import { useRef,useState } from 'react';
import Login from './Login';
import Chat from './Chat';
import UserP from './UserP';
import { useSelector } from 'react-redux';
import ResultP from './Result';

import Vali from './validation'
import AddDeg from './Degree';
const socket = io.connect("http://localhost:3001");
function App() {
const [UserRoom,SetUserRoom]=useState("")
const [room, setRoom] = useState("");
const [Loggedin, setLoggedin] = useState("true");
const [name,setName]=useState('')
const names = useSelector((state2) => state2);
console.log(names);
  return (
    <div className="all">
      <Router>
        <Switch>
         <Route path='/mic'>
          <Example socket={socket} />
         </Route>
          <Route path="/Pri">
            <Private room={room} socket={socket} UserRoom={UserRoom} />
          </Route>
          <Route path="/vali">
            <Vali />
          </Route>
          <Route path="/ALLSC">
            <CWS socket={socket} setRoom={setRoom} />
          </Route>
          <Route path="/Chat">
            <Chat
              socket={socket}
              UserRoom={UserRoom}
              name={name}
              room={room}
              setRoom={setRoom}
            />
          </Route>
          <Route path="/Login">
            <Login
              name={name}
              setName={setName}
              setLoggedin={setLoggedin}
              Loggedin={Loggedin}
            />
          </Route>
          <Route path="/user">
            <UserP
              room={room}
              setRoom={setRoom}
              SetUserRoom={SetUserRoom}
              socket={socket}
              setLoggedin={setLoggedin}
              Loggedin={Loggedin}
            />
          </Route>
          <Route path="/FCRUD">
            <CRUD />
          </Route>
          <Route path="/Random">
            <RandomP />
          </Route>
          <Route path="/ResultP">
            <ResultP />
          </Route>
          <Route path="/makeuser">
            <MakeUser setLoggedin={setLoggedin} Loggedin={Loggedin} />
          </Route>
          <Route path="/AdminP">
            <AdminP setLoggedin={setLoggedin} Loggedin={Loggedin} />
          </Route>
          <Route path="/MakeGroup">
            <MakeGroup setLoggedin={setLoggedin} Loggedin={Loggedin} />
          </Route>
          <Route path="/AddDeg">
            <AddDeg />
          </Route>
          <Route path="/AdduserG">
            <AddUserToG setLoggedin={setLoggedin} Loggedin={Loggedin} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
