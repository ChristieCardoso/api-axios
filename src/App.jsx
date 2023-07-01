import "./App.css";
import axios from "axios";

function App() {
  const url = "https://api.randomuser.me/?results=3";
  function getUser() {
    axios
      .get(url)
      .then((response) => {
        const data = response.data.results;
            console.log('ei', data);
      })
      .catch((error) => console.log(error));
  }
  getUser();

  return (
    <div className="App">
      <div>
        <p id="renderResults">Edit save to test HMR</p>
      </div>
    </div>
  );
}

export default App;
