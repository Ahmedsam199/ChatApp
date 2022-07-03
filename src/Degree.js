import axios from "axios";

import { useEffect, useRef, useState, Component } from "react";
import Select from "react-select";

const AddUserToG = () => {
  const val1 = useRef();
  const [select2, setSelected] = useState([]);
  const val2 = useRef();
  const [data, setData] = useState("");
  const options = [];
  
  const [SelectedG, setSelectedG] = useState("");
  const Deg=useRef();
  const test2 = (e) => {
          
      setSelectedG(e.label);
    };
    
    console.log(SelectedG);

  useEffect(() => {
    axios.get("http://localhost:8000/GetAllUseres").then((res) => {
      for (let i = 0; i < res.data.length; i++) {
        options.push({ value: res.data[i].id, label: res.data[i].name });
      }
    });
  }, [test2]);
  
  const Add = () => {
    axios.post("http://localhost:8000/AddDegree", {
      Degree: Deg.current.value,
      name: SelectedG,
    });
  };
  return (
    <div className="AdduG">
      <center>
        Choose The Student name
        <Select
          placeholder="Name..."
          className="w-50"
          options={options}
          onChange={(e) => test2(e.valueOf(e.target))}
        />
        <br></br>
        Add Degree
        <input ref={Deg} type="number" max={100} min={0} className="form-control w-50" />
        <br></br>
        <button className="btn btn-primary" onClick={Add}>
          Import Degree
        </button>
      </center>
    </div>
  );
};

export default AddUserToG;
