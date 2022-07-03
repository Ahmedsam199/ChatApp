import "./App.css";
import "rsuite/dist/rsuite.min.css"; // or ''
import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { useRef } from "react";

import { useSelector } from "react-redux";
import axios from "axios";
import { PdfContainer } from "react-files-viewer";
import { ReactAudioRecorder } from "@baxibaba/react-audio-recorder";
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
import {Form} from 'react-bootstrap'
import { Player } from "video-react";
import {
  Send,
  Delete,
  Box,
  Edit,
  messagecircle,
  Users,
  LogOut,Mic,MicOff
} from "react-feather";
import { Tokens, onMessageListener } from "./firebase";
import ReactAudioPlayer from "react-audio-player";
import Sidenav from "rsuite/Sidenav";
import Nav from "rsuite/Nav";
import { Gear, AddOutline } from "@rsuite/icons";
import Example from './aa'
import ExitIcon from "@rsuite/icons/Exit";
import { useHistory } from "react-router-dom";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import UserInfoIcon from "@rsuite/icons/UserInfo";
import Swal from "sweetalert2";
import ReactPlayer from "react-player";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import ReactRecord from 'react-record';
import FileViewer from "react-file-viewer";

import ImageUploading from "react-images-uploading";
const Private = ({ room, socket, UserRoom }) => {
  const [expanded, setExpanded] = React.useState(true);
  const [activeKey, setActiveKey] = React.useState("1");


const type = 'pdf'
  const img2 =useRef()
  //Room State
  const [Aaudio,setAaudio]=useState('')
  const [Aid, setAid] = useState("");
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
  console.log(`${UserRoom}`);
  const [messageList, setMessageList] = useState([]);
  const [uname, setUname] = useState("");
  const [recordState,setRecordState]=useState('')
  const [audioData,setaudioData]=useState([])
  const start=()=>{
    setRecordState(RecordState.START);
  }
 const stop = () => {
   setRecordState(RecordState.STOP);
  };

  //audioData contains blob and blobUrl
  const onStop = (audioData) => {
    setaudioData(audioData)
  };
  const sendrecvoice = () => {
    console.log(audioData);

    var urls = audioData.url;
    var blob = audioData.blob;
    // converts blob to base64
    var blobToBase64 = function (blob, cb) {
      var reader = new FileReader();
      reader.onload = function () {
        var dataUrl = reader.result;
        var base64 = dataUrl.split(",")[1];
        cb(base64);
      };
      reader.readAsDataURL(blob);
    };
    blobToBase64(blob, function (base64) {
      // encode
      var update = {
        blob: base64,
        name: token2.name,
        to: token2.room,
        room: token2.room,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      axios.post("http://localhost:8000/api/test", update).then((resp)=>{
      const messageData = {
        room: token2.room,
        author: token2.name,
        message: "",
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),

        to: token2.room,
        image: "",
        id: resp.data.id,
        audio: resp.data.audio,
        video: "",
        file:""
      };

      socket.emit("sendP_message", messageData);
      setMessageList([...messageList, messageData]);
      setUname(messageData.name);
      msg.current.value = "";
      console.log(messageData);
      });
    });

    
  };
  const messagesEndRef = useRef(null);
  const Del = (x, i) => {
    const data = { x, i, messageList };
    socket.emit("Delete_Message", data);
    const newMessage = messageList.filter((y) => y.id != x);
    // Delete Message
    setMessageList(newMessage);
    axios
    .post("http://localhost:8000/deletePmsg", {
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
    const [image, setImage] = useState('');

    const handleChange = (e) => {
      
      console.log(e.target.files);
      setImage(e.target.files[0]);
    };
  const from=token2.name
  const to =token2.room
  const Aud=()=>{
     const data = new FormData();
 data.append("image", "");
 data.append("video", "");
     data.append("image", image);
     data.append("msg", msg.current.value);
     data.append("Name", token2.name);
     data.append("room", token2.room);
     data.append(
       "time",
       new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
     );
     data.append("to", token2.room);
     const config = {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     };
     axios.post("http://localhost:8000/PostAudio", data, config).then((res) => {
       const messageData = {
         room: token2.room,
         author: token2.name,
         message: msg.current.value,
         time:
           new Date(Date.now()).getHours() +
           ":" +
           new Date(Date.now()).getMinutes(),
         id: res.data.id,
         to: token2.room,
         audio: res.data.audio,
         image: "",
         video: "",
         file: "",
       };

       socket.emit("sendP_message", messageData);
       setMessageList([...messageList, messageData]);
       setUname(messageData.name);
       msg.current.value = "";
     });
  }

  const video=()=>{
     const data = new FormData();

     data.append("image", image);
      data.append("audio", null);
      data.append("image", null);
     data.append("msg", msg.current.value);
     data.append("Name", token2.name);
     data.append("room", token2.room);
     data.append(
       "time",
       new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
     );
     data.append("to", token2.room);
     const config = {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     };
     axios.post("http://localhost:8000/PostVideo", data, config).then((res) => {
       const messageData = {
         room: token2.room,
         author: token2.name,
         message: msg.current.value,
         time:
           new Date(Date.now()).getHours() +
           ":" +
           new Date(Date.now()).getMinutes(),
         id: res.data.id,
         to: token2.room,
         video: res.data.video,
         image:"",
         audio:"",
         file:""
       };

       socket.emit("sendP_message", messageData);
       setMessageList([...messageList, messageData]);
       setUname(messageData.name);
       msg.current.value = "";
     });
  }
  const fileup=()=>{
     const data = new FormData();

     data.append("image", image);
     data.append("msg", msg.current.value);
     data.append("audio", "");
     data.append("video", "");
     data.append("Name", token2.name);
     data.append("room", token2.room);
     data.append(
       "time",
       new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
     );
     data.append("to", token2.room);
     const config = {
       headers: {
         "Content-Type": "multipart/form-data",
       },
     };
     axios.post("http://localhost:8000/Postfile", data, config).then((res) => {
       const messageData = {
         room: token2.room,
         author: token2.name,
         message: msg.current.value,
         time:
           new Date(Date.now()).getHours() +
           ":" +
           new Date(Date.now()).getMinutes(),
         id: res.data.id,
         to: token2.room,
         image:"",
         audio: "",
         video: "",
         file:res.data.file
       };

       socket.emit("sendP_message", messageData);
       setMessageList([...messageList, messageData]);
       setUname(messageData.name);
       msg.current.value = "";
     });
  }
  const sendPic=()=>{
    const data = new FormData();

    data.append("image", image);
    data.append("msg", msg.current.value);
    data.append('audio','')
    data.append("video", "");
    data.append("Name", token2.name);
    data.append("room", token2.room);
    data.append(
      "time",
      new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    );
    data.append("to", token2.room);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    axios.post("http://localhost:8000/addimage", data, config).then((res) => {
      const messageData = {
        room: token2.room,
        author: token2.name,
        message: msg.current.value,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
        id: res.data.id,
        to: token2.room,
        image: res.data.image,
        audio: "",
        video: "",
        file: "",
      };

      socket.emit("sendP_message", messageData);
      setMessageList([...messageList, messageData]);
      setUname(messageData.name);
      msg.current.value = "";
    });
  }
  const [voice,setVoice]=useState('')
  const SendVoice=()=>{
      const data = new FormData();
console.log(voice)
      data.append("image", voice);
      data.append("msg", msg.current.value);
      data.append("Name", token2.name);
      data.append("room", token2.room);

      data.append(
        "time",
        new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes()
      );
      data.append("to", token2.room);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      axios.post("http://localhost:8000/PostRec",{
        Name:token2.name,
        audio:voice
      }).then((res) => {
        const messageData = {
          room: token2.room,
          author: token2.name,
          message: msg.current.value,
          time:
            new Date(Date.now()).getHours() +
            ":" +
            new Date(Date.now()).getMinutes(),
          id: res.data.id,
          to: token2.room,
          audio: res.data.audio,
        };

        socket.emit("sendP_message", messageData);
        setMessageList([...messageList, messageData]);
        setUname(messageData.name);
        msg.current.value = "";
      });
  }
  const sendMessage = (e) => {
    
e.preventDefault();
 
  const data = new FormData();
  
  data.append("image", image);
  
  data.append('msg',msg.current.value);
  data.append('Name',token2.name)
  data.append('room',token2.room)
  data.append(
    "time",
    new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
  );
  data.append('to',token2.room)
const config= {   headers: {
        "Content-Type": "multipart/form-data",
      }}
// Send A new Message To DB
      axios
        .post(
          "http://localhost:8000/PPostMessage",
          {
            msg: msg.current.value,
            Name: token2.name,
            room: token2.room,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
            to: token2.room,

            
          },
          
        )
        .then((res) => {
   
          const messageData = {
            room: token2.room,
            author: token2.name,
            message: msg.current.value,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
            id: res.data.id,
            to: token2.room,
            image: "",
            video: "",
            audio: "",
            file: "",
          };

          socket.emit("sendP_message", messageData);
          setMessageList([...messageList, messageData]);
          setUname(messageData.name);
          msg.current.value = "";
        });
    
  };
  console.log(messageList);
  const [OnUser, SetOnUser] = useState([]);
  useEffect(() => {
    socket.on("newOn", (data) => {
      SetOnUser(data.data);
    });
  }, [socket]);
  const audi=useRef()
const audios=()=>{
audi.play()
}
  useEffect(() => {
    const datas = { room:(token2.name), name: token2.name };
    socket.emit("join_room", datas);
  }, []);
  useEffect(() => {
    // Join The Room
    const datas = { room: token2.room,name:token2.name };
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
    socket.on("receiveP_message", (data) => {
      
      messageList.forEach((x)=>{
        if(!x.author===token2.name && !x.to===token2.room){
          
        }else{
          setMessageList([...messageList, data]);

        }
      })
    });
  }, [sendMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    // Get The Saved Message From DB
    axios
      .post("http://localhost:8000/getAllPMsg", {
        from: token2.name,
        room:token2.room,
        to: token2.room,
      })
      .then((res) => {
        setMessageList(...messageList, res.data);
      });
  }, []);
const Del2=(x)=>{
    const newMessage = messageList.filter((y) => y.id != x);
    // Delete Message
    setMessageList(newMessage);
  axios.post("http://localhost:8000/DeleteFromme", {
    isit:true,
    id: x,
  });
}
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
      .post(`http://localhost:8000/editPmsg`, {
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
    Swal.fire({
      title: "Do you want to Delete the Message?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete From All",
      denyButtonText: "Delete From Me",
      customClass: {
            actions: "my-actions",
        cancelButton: "order-1 right-gap",
        confirmButton: "order-2",
        denyButton: "order-3",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Delete All!","","");
        Del(x,i)
      } else if (result.isDenied) {
        Swal.fire("Deleted For me", "", "");
        Del2(x)
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
             <Nav.Item onClick={() => setLgShow(true)} icon={<WavePointIcon />}>
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
         <p>Whats Down</p>
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
                         <div className="msgcontt">
                           <p style={{ margin: "3px", fontSize: "25px" }}>
                             {messageContent.message}
                           </p>

                           <img
                             width={100}
                             id={messageContent.image == "" ? "noimg" : "other"}
                             src={`http://localhost:8000/${messageContent.image}`}
                           ></img>
                           <div
                             id={messageContent.file == "" ? "noimg" : "other"}
                             className="file"
                           >
                             <a className="btn btn-primary" style={{marginRight:"10px",marginTop:"7px"}} target='target_blank'
                               href={`http://localhost:8000/${messageContent.file}`}
                             >open File</a>
                           </div>
                           <div
                             id={
                               messageContent.video == "" ? "noimg" : "ot2her"
                             }
                             className="playerr"
                           >
                             <Player
                               
                               className="videoa"
                               playsInline
                               poster=""
                               src={`http://localhost:8000/${messageContent.video}`}
                             />
                           </div>
                           <div
                             className="audio"
                             id={
                               messageContent.audio == "" ? "noimg" : "ot2her"
                             }
                           >
                             <ReactAudioPlayer
                               src={`http://localhost:8000/${messageContent.audio}`}
                               controls
                             />
                           </div>
                         </div>
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
         <input
           type="file"
           placeholder="Write something..."
           na
           me="image"
           className="form-control"
           onChange={handleChange}
         />

         <button
           onClick={sendMessage}
           className="btsend"
           style={{ background: "#263238" }}
         >
           <Send color="rgb(200, 200, 3)" />
         </button>
         <button
           className="btsend"
           style={{ background: "#263238" }}
           onClick={sendPic}
         >
           Pic
         </button>
         <button
           className="btsend"
           style={{ background: "#263238" }}
           onClick={video}
         >
           Vid
         </button>
         <button
           className="btsend"
           style={{ background: "#263238" }}
           onClick={Aud}
         >
           Aud
         </button>
         <button
           className="btsend"
           style={{ background: "#263238" }}
           onClick={fileup}
         >
           file
         </button>
       </div>
       <div className="recbtn">
         <br></br>
         <AudioReactRecorder state={recordState} onStop={onStop} />

         <button className="btn btn-primary" onClick={start}>
           Start<Mic />
         </button>
         <button className="btn btn-primary" onClick={stop}>
           Stop<MicOff />
         </button>
         <button className="btn btn-primary" onClick={sendrecvoice}>
           Send
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

export default Private;
