import React, { useState } from "react";
import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import EditBar from "./components/EditBar";
import Members from "./components/Members";

function App() {
  const [memberList, setMemberList] = useState([]);
  return (
    <div className="App">
      <div className="Header">The "E" Society</div>
      <EditBar setMemberList={setMemberList} />
      <Members memberList={memberList} setMemberList={setMemberList} />
    </div>
  );
}

export default App;
