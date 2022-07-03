import "./App.css";
import MakeUser from "./MakeUser";
import MakeGroup from "./MakeGroup";
import AddUserToG from "./AddUserToG";
import AdminP from "./AdminP";
import io from "socket.io-client";
import './style.css'
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {  Tokens, onMessageListener, currentToken } from "./firebase";
const SignupSchema = yup.object().shape({
  firstName: yup.string().required(),
  website: yup.string().url(),
});
const Login = ({setName,setLoggedin,Loggedin}) => {
  const dispatch =useDispatch()
  const [user,setUser]=useState()
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  resolver: yupResolver(SignupSchema),
});
const onSubmit = (data) => {
  console.log(data);
};

  const val1 = useRef();
  const history = useHistory();
  const Login = () => {
    if(val1.current.value==""){

    }else{
      axios
        .post("http://localhost:8000/loginAdmin", {
          User: val1.current.value,
        })
        .then((res) => {
          if (res.data.resp[0].isAdmin === true) {
            history.push("/AdminP");
                dispatch({ type: "add", token: `${res.data.accessToken}` });
                dispatch({ type: "addN", name: `${val1.current.value}` });

            setLoggedin("true");
          } else {
            dispatch({ type: "add", token: `${res.data.accessToken}` });
            dispatch({ type: "addN", name: `${val1.current.value}` });

            console.log("False");
            history.push("/Random");
            setName(val1.current.value);
          }
        });
    }
  };
  Tokens()


  return (
    <div className="AdduG">
      <form onSubmit={handleSubmit(onSubmit)}>
        <center>
          <input
            placeholder="Enter username..."
            ref={val1}
            className="form-control w-50"
          />
          {errors?.firstName?.type === "required" && (
            <div className="err">
              <p style={{color:"#000"}}>⚠ Name fIeld Is RequIred Or User Is Incorrect</p>
            </div>
          )}
          <br></br>
          <button onClick={Login} className="btn btn-primary">
            Login
          </button>
        </center>
      </form>
      
    </div>
  );
};

export default Login;
