import "./App.css";
import "rsuite/dist/rsuite.min.css"; // or ''
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import UserP from "./UserP";
import React from "react";
import swal from "sweetalert";
import toast, { Toaster } from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import WavePointIcon from "@rsuite/icons/WavePoint";
import Avatar from "react-avatar";
import {
  Send,
  Delete,
  Box,
  Edit,
  messagecircle,
  Users,
  LogOut,
} from "react-feather";
import { Tokens, onMessageListener } from "./firebase";
import Sidenav from "rsuite/Sidenav";
import Nav from "rsuite/Nav";
import { Gear, AddOutline } from "@rsuite/icons";
import ExitIcon from "@rsuite/icons/Exit";
import { useHistory } from "react-router-dom";
import UserInfoIcon from "@rsuite/icons/UserInfo";
const Chat = ({ room, socket, UserRoom }) => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");
  //Room State
  console.log(room);
  const msg = useRef();
  const history = useHistory();
  const token2 = useSelector((state) => state);
  const [newmsg, setnewMsg] = [];
  const [smShow, setSmShow] = useState(false);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [lgShow, setLgShow] = useState(false);
  const val1 = useRef();
console.log(`${UserRoom}`)
  const [messageList, setMessageList] = useState([]);
  const [uname, setUname] = useState("");
  const messagesEndRef = useRef(null);
  const Del = (x, i) => {
    const data = { x, i, messageList };
    socket.emit("Delete_Message", data);
    const newMessage = messageList.filter((y) => y.id != x);
    // Delete Message
    setMessageList(newMessage);
    axios
      .post("http://localhost:8000/deletemsg", {
        id: x,
      })
      .then((res) => {});
  };
  // Recive new Message
  useEffect(() => {
    socket.on("recivenewM", (data) => {
      setMessageList(data);
    });
  }, [Del]);
  const sendMessage = () => {
    if (msg.current.value !== "") {
        axios.post("http://localhost:8000/PostMessage", {
          msg: msg.current.value,
          Name: token2.name,
          room: token2.name,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
        });
      // Send A new Message To DB
      axios
        .post("http://localhost:8000/PostMessage", {
          msg: msg.current.value,
          Name: token2.name,
          room: token2.room,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
          
        }).then((res)=>{
            const messageData = {
              room: token2.room,
              author: token2.name,
              message: msg.current.value,
              time:
                new Date(Date.now()).getHours() +
                ":" +
                new Date(Date.now()).getMinutes(),
              id: res.data.id,
            };
            socket.emit("send_message", messageData);
            setMessageList([...messageList, messageData]);
            setUname(messageData.name);
            msg.current.value = "";

        })
       
    }
  };
  console.log(messageList);
  const [OnUser, SetOnUser] = useState([]);
  useEffect(() => {
    socket.on("newOn", (data) => {
      SetOnUser(data.data);
    });
  }, [socket]);

  useEffect(() => {
    const datas = { room: token2.room, name: token2.name };
    socket.emit("join_room", datas);
  }, []);
  useEffect(() => {
    // Join The Room
    const datas = { room: token2.room, name: token2.name };
    socket.on("receive_on", (data) => {
      SetOnUser(...OnUser, data);
    });
  }, [socket]);
  console.log(OnUser);
  let uniqueChars = [];
  OnUser.forEach((c) => {
    if (!uniqueChars.includes(c.name)) {
      uniqueChars.push(c);
    }
  });
  const ids = OnUser.map((o) => o.name);
  let filtered = OnUser.filter(
    ({ name }, index) => !ids.includes(name, index + 1)
  );

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  }, [sendMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    // Get The Saved Message From DB
    axios
      .post("http://localhost:8000/getAllMsg", {
        room: token2.room,
      })
      .then((res) => {
        setMessageList(...messageList, res.data);
      });
  }, []);

  useEffect(scrollToBottom, [messageList]);
  const Delet = (x, i) => {
    const newm = val1.current.value;
    const IDD = (element) => element.id == x;
    const newmsg = newm;
    const index = messageList.findIndex(IDD);
    messageList[index].message = newmsg;
    setMessageList(messageList);
    axios
      // Edit A Message
      .post(`http://localhost:8000/editmsg`, {
        id: x,
        newM: val1.current.value,
      })
      .then((res) => {
        handleClose();
      });
    const data = { x, i, newm, messageList };
    socket.emit("UpdateM", data);
  };
  useEffect(() => {
    // Recive the Message From The Socket
    socket.on("recivenewMm", (data) => {
      setMessageList(data);
    });
  });
  const exit = () => {
    setShow(false);
  };
  const test2 = (x, i) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this Message!!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("Your Message has been deleted (:", {
          icon: "",
        }).then(() => {
          Del(x, i);
        });
      } else {
        swal("Your Message is safe!");
      }
    });
  };
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:8000/GetAllUnames", {
        room: token2.room,
      })
      .then((res) => {
        setUsers(res.data);
      });
  }, []);
  const [notification, setNotification] = useState({ title: "", body: "" });
  onMessageListener()
    .then((payload) => {
      console.log(payload);
      setNotification({
        title: payload.notification.title,
        body: payload.notification.body,
      });
    })
    .then((res) =>
      // The Function
      notify()
    )
    .catch((err) => console.log("failed: ", err));
  // Set The Notification Body

  const notify = () => toast(<ToastDisplay />);
  function ToastDisplay() {
    return (
      <div>
        <center>
          <p>
            <b>{notification?.title}</b>
          </p>
        </center>
        <p>{notification?.body}</p>
      </div>
    );
  }

  // Notification Body

  const Logout = () => {
    history.push("/Login");
  };
  return (
    <div className="chat-window">
      <Modal show={smShow} onHide={() => setSmShow(false)}>
        <Modal.Header>
          <Modal.Title style={{ marginLeft: "170px" }}>
            {users.length} User Group
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {users.map((x) => (
            <div className="App1">
              <h1>{x.name}</h1>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <Modal
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title
            id="example-modal-sizes-title-lg"
            style={{ marginLeft: "170px" }}
          >
            {filtered.length} User Online
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {filtered.map((x) => (
            <div id={x.name === "" ? "you" : "other"} className="App1">
              <h1>{x.name}</h1>
            </div>
          ))}
        </Modal.Body>
      </Modal>
      <div style={{ width: 240 }}>
        <Sidenav expanded={expanded}>
          <Sidenav.Body>
            <Nav activeKey={activeKey} onSelect={setActiveKey}>
              <Nav.Item
                onClick={() => setSmShow(true)}
                eventKey="2"
                icon={<UserInfoIcon />}
              >
                All User
              </Nav.Item>
              <Nav.Item
                onClick={() => setLgShow(true)}
                icon={<WavePointIcon />}
              >
                Online User
              </Nav.Item>
              <Nav.Item onClick={Logout} icon={<ExitIcon />}>
                Logout
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
          <Sidenav.Toggle
            expanded={expanded}
            onToggle={(expanded) => setExpanded(expanded)}
          />
        </Sidenav>
      </div>
      <div className="bg"></div>

      <div className="bg2"></div>
      <div className="bg3"></div>

      <div className="content">
        <div className="chat-header">
          <p>React</p>
        </div>

        <div className="chat-body">
          <div className="ROOT_CSS">
            {messageList.map((messageContent) => {
              return (
                <div
                  className="message"
                  id={token2.name === messageContent.author ? "you" : "other"}
                >
                  <div>
                    <div className="all">
                      <div className="area">
                        <Avatar
                          className="avat"
                          name={messageContent.author}
                          size="40"
                          round="20px"
                        />
                        <div
                          className="message-content"
                          style={{ display: "flex" }}
                        >
                          <p>
                            <span className="BB">
                              <DropdownButton
                                className="dropp"
                                variant=""
                                style={{
                                  marginRight: "10px",
                                  marginTop: "5px",
                                }}
                              >
                                <div className="dropItem" style={{}}>
                                  <Dropdown.Item href="#">
                                    <button
                                      onClick={() =>
                                        test2(
                                          messageContent.id,
                                          messageContent.room
                                        )
                                      }
                                      className="btn btn-sucsess "
                                    >
                                      <Delete size={17} />
                                    </button>
                                  </Dropdown.Item>
                                  <Dropdown.Divider />
                                  <Dropdown.Item href="#">
                                    <Button
                                      variant="sucsess"
                                      key="example2-modal-sizes-title-sm"
                                      onClick={() =>
                                        handleShow(
                                          messageContent.id,
                                          messageContent.room
                                        )
                                      }
                                    >
                                      <Modal
                                        show={show}
                                        onHide={exit}
                                        aria-labelledby="example2-modal-sizes-title-sm"
                                      >
                                        <Modal.Header>
                                          <Modal.Title
                                            style={{ marginLeft: "200px" }}
                                          >
                                            Update
                                          </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                          <input
                                            type="text"
                                            ref={val1}
                                            className="form-control w-50"
                                          />
                                        </Modal.Body>
                                        <Modal.Footer>
                                          <Button
                                            style={{ marginRight: "175px" }}
                                            variant="primary"
                                            onClick={() =>
                                              Delet(
                                                messageContent.id,
                                                messageContent.room
                                              )
                                            }
                                          >
                                            <b>Save Changes</b>
                                          </Button>
                                        </Modal.Footer>
                                      </Modal>
                                      <Edit size={17} />
                                    </Button>
                                  </Dropdown.Item>
                                </div>
                              </DropdownButton>
                            </span>
                          </p>

                          <p style={{ margin: "3px", fontSize: "25px" }}>
                            {messageContent.message}
                          </p>
                        </div>
                      </div>

                      <div className="message-meta">
                        <p
                          style={{ color: "white", marginRight: "13px" }}
                          id="time"
                        >
                          {messageContent.time}
                        </p>
                        <p
                          style={{ color: "white", marginRight: "13px" }}
                          id="author"
                        >
                          {messageContent.author}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>
        <div className="chat-footer">
          <input placeholder="Message..." className="form-control" ref={msg} />

          <button
            onClick={sendMessage}
            className="btsend"
            style={{ background: "#263238" }}
          >
            <Send color="rgb(200, 200, 3)" />
          </button>
        </div>
      </div>
      <div className="Toast"></div>
      <div className="Toast">
        <Toaster />
      </div>
    </div>
  );
};





export default Chat;
