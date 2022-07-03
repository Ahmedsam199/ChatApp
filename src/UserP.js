import axios from "axios";
import { Button, FormControl, Card } from "react-bootstrap";
import { useState,useEffect,useRef } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { v4 as uuidv4 } from "uuid";
const UserP = ({ room, setLoggedin, setRoom, socket, SetUserRoom }) => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  console.log();
  const history = useHistory();
  const states = useSelector((state) => state);
  console.log(states.token);
  localStorage.setItem("JWT", states.token);
  const [Users, setUsers] = useState([]);
  const joinRoom = (x) => {
    dispatch({ type: "addR", room: `${x}` });
    setRoom(x);
    socket.emit("join_room", states.room);
    history.push("/Chat");
  };
    const joinRoom2 = (x) => {
      dispatch({ type: "addR", room: `${x}` });
      setRoom(x);
      socket.emit("join_room", states.room);
      history.push("/Pri");
    };

  useEffect(() => {
    axios.post("http://localhost:8000/GetAllGnames").then((res) => {
      setData(res.data);
    });
  }, []);
  useEffect(() => {
    axios.get("http://localhost:8000/allStuNames").then((resp) => {
      setUsers(resp.data);
    });
  }, []);

  console.log(Users);
SetUserRoom(states.name)
  return (
    <div className="">
      <Card className="card">
        <Card.Body className="CardB">
          <a
            style={{ cursor: "pointer" }}
            onClick={() => joinRoom(`${states.name}isAdmin`)}
          >
            <center>Talk To Admin</center>
          </a>
        </Card.Body>
      </Card>
      {data.map((x) => (
        <center key={x.id}>
          <Card className="card">
            <Card.Body className="CardB">
              <a style={{ cursor: "pointer" }} onClick={() => joinRoom(x.id)}>
                Group: {x.GroupName}
              </a>
            </Card.Body>
          </Card>
        </center>
      ))}

      {Users.map((x) => (
        <center key={x.id}>
          <Card className="card">
            <Card.Body className="CardB">
              <a style={{ cursor: "pointer" }} onClick={() => joinRoom2(x.name)}>
                User: {x.name}
              </a>
            </Card.Body>
          </Card>
        </center>
      ))}
    </div>
  );
};
 
export default UserP;