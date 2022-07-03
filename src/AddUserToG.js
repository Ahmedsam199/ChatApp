import axios from "axios";

import { useEffect,useRef, useState, Component } from "react";
import Select from "react-select";

const AddUserToG = () => {
  const val1 = useRef();
  const [select2, setSelected] = useState([]);
  const val2 = useRef();
  const [data, setData] = useState("");
  const options = [];
  const Useres=[]
  const [SelectedG,setSelectedG]=useState("")
  const test2 = (e) => {
    
    e.map((x)=>{
      Useres.push(x.value)
      setSelected(Useres)

    })
    
  };
    const test3 = (e) => {

      setSelectedG(e);
      
    };
    const options2=[]
useEffect(()=>{
  axios.get("http://localhost:8000/groupName").then((resp) => {
    console.log(resp);
    for (let i = 0; i < resp.data.length; i++) {
      options2.push({
        value: resp.data[i].id,
        label: resp.data[i].GroupName,
      });
    }
  });
},[test3])

  useEffect(() => {
    axios.get("http://localhost:8000/GetAllUseres").then((res) => {
      
for(let i=0;i<res.data.length;i++){
  options.push({ value:res.data[i].id, label:res.data[i].name });
  
}
      
    });
  },[test2]);
  console.log(select2);
  const Add = () => {
    axios.post("http://localhost:8000/AddUserToG", {
      Gid: SelectedG,
      data: select2,
    });
  };
  return (
    <div className="AdduG">
      <center>
        Choose The Group Name
        <Select
          placeholder="GroupName..."
          className="w-50"
          options={options2}
          onChange={(e) => test3(e.valueOf(e.target).value)}
        />
        <br></br>
        Choose User To be ADD
        <Select
          isMulti
          className="w-50"
          placeholder="UserName..."
          options={options}
          onChange={(e) => test2(e.valueOf(e.target))}
        />
      <br></br>
      <button className="btn btn-primary" onClick={Add}>
        Add Useres
      </button>
      </center>
    </div>
  );
};

export default AddUserToG;
