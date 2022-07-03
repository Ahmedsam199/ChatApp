import axios from "axios";
import { Button, FormControl, Card } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { useHistory } from "react-router-dom";
import Chat from "./Chat";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const CWS = ({ setRoom, socket }) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8000/allStuNames").then((res) => {
      setData(res.data);
    });
  }, []);
   const dispatch = useDispatch();
   const [datas, setDatas] = useState([]);

   const history=useHistory();
   const states=useSelector((state) => state);
   console.log(states.token);
   localStorage.setItem("JWT", states.token);
   const joinRoom = (x) => {
     dispatch({ type: "addR", room: `${x}` });
     setRoom(x);
     socket.emit("join_room", states.room);
     history.push("/Chat");
   };
  useEffect(() => {
     axios
       .post("http://localhost:8000/allStuNames")
       .then((res) => {
         setData(res.data)
       });
   }, []);
   
  return (
    <div className="">
      {data.map((x) => (
        <center>
          <div className="app">
            <Card>
              <Card.Body>
                <a>{x.name}</a>
                <br></br>
                <button
                  onClick={() => joinRoom(`${x.name}isAdmin`)}
                  className="btn btn-primary"
                >
                  Chat
                </button>
              </Card.Body>
            </Card>
          </div>
        </center>
      ))}
    </div>
  );
};

export default CWS;
