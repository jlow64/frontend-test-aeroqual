import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import EditBar from "./components/EditBar";
import Members from "./components/Members";

function App() {
  return (
    <div className="App">
      <div className="Header">The "E" Society</div>
      <EditBar />
      <Members />
    </div>
  );
}

export default App;
