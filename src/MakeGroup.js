import axios from "axios";
import { useRef } from "react";
const MakeGroup = () => {
    const val1=useRef();
    const val2=useRef();
    
    const Create=() =>{
        axios.post("http://localhost:8000/createnewg", {
          User: val1.current.value,
          gname:val2.current.value
        });
    }
    return (
      <div className="AdduG">
    
        <center>
          Enter The Admin Name
          <input
            type="text"
            className="form-control w-50"
            ref={val1}
            name=""
            id=""
          />
          <br></br>
          Enter The Group Name
          <input
            type="text"
            ref={val2}
            name=""
            id=""
            className="form-control w-50"
          />
          <button  style={{marginTop:"20px"}} className="btn btn-primary" onClick={Create}>
            Create Group
          </button>

        </center>
      </div>
    );
}
 
export default MakeGroup;