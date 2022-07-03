import { useEffect, useRef, useState, Component } from "react";
import Select from "react-select";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { parsePhoneNumber } from "react-phone-number-input";
import axios from "axios";


import { getCountryCallingCode } from "react-phone-number-input";
const MakeUser = () => {
  const [countryCode,SetCountryCode]=useState("")
  const val2=useRef()
  const [value, setValue] = useState();
    const [isAdmin,setIsAdmin]=useState('');
  const val1 = useRef();
  const Add = () => {
    axios.post("http://localhost:8000/newGuser", {
      User: val1.current.value,
      isAdmin: isAdmin,
    });
  };

  const phoneNumber = parsePhoneNumber(`${value}`);


console.log(phoneNumber?.countryCallingCode);
  

   const options = [{value:1,label:"Admin"},{value:0,label:"User"}];
  const test2 = (e) => {
    console.log(e);
setIsAdmin(e)
  };
  return (
    <div className="AdduG">
      <center>
        <h5>Name:</h5>
        <input ref={val1} className="form-control w-50" type="text" />
        <br></br>

        <PhoneInput
          className="w-50"
          
          placeholder="Enter phone number"
          value={value}
          onChange={setValue}
          ref={val2}
        />
        <br></br>
        <Select
          className="w-50"
          options={options}
          onChange={(e) => test2(e.valueOf(e.target).value)}
        />
        <br></br>
        <button
          style={{ marginRight: "30px" }}
          onClick={Add}
          className="btn btn-primary"
        >
          Add User
        </button>
      </center>
    </div>
  );
};

export default MakeUser;
