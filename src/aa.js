import React, { Component, useState } from "react";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import axios from "axios";
class Example extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      setMessageList:[],
      messageList:[],
      recordState: null,
      data:''
    };
  }
  // Send Function 
  send=()=>{
console.log(this.props.tokenroom);
const socket=this.props.socket
    const name=this.props.tokenname
    const to = this.props.tokenroom;
const messageList=this.props.messageList
var urls=this.state.data.url
    var blob = this.state.data.blob;
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
        name: name,
        to: to,
        room: to,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      axios.post("http://localhost:8000/api/test", update).then((resp) => {
      });
    });
    const messageData = {
      room: to,
      author: name,
      message: "",
      time:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
     
      to: to,
      image: "",
      audio: urls,
       video: "",
    };
  this.setState({messageList:[...messageList,messageData]})

   
console.log(messageData);
      
  }
  

  start = () => {
    this.setState({
      recordState: RecordState.START,
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    });

  };

  //audioData contains blob and blobUrl
  onStop = (audioData) => {
    this.setState({ data: audioData });
  };

  render() {
    const { recordState } = this.state;

    return (
      <div className="recbtn">
        <br></br>
        <AudioReactRecorder state={recordState} onStop={this.onStop} />

        <button className="btn btn-primary" onClick={this.start}>
          Start
        </button>
        <button className="btn btn-primary" onClick={this.stop}>
          Stop
        </button>
        <button className="btn btn-primary" onClick={this.send}>
          Send
        </button>
      </div>
    );
  }
}
export default Example