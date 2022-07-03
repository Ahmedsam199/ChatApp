import {
  BrowserRouter as Router,
  Link,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
const RandomP = () => {
  return (
    <div style={{ marginTop: "200px" }} className="div">
      <div className="buttons">
        <center>
          <Link to="user" className="btn btn-primary">
            Go Chat
          </Link>
          <br></br>
          <br></br>
          <br></br>
          <Link to="ResultP" className="btn btn-primary">
            Show Result
          </Link>
        </center>
      </div>
    </div>
  );
};

export default RandomP;
