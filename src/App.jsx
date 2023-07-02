import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const url = "https://api.randomuser.me/?results=2";
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url);
        const data = response.data.results;
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="App">
      <div>
        {users.map((user) => (
          <div key={user.login.username} >
            <img src={user.picture.large} alt={user.name.first} />
            <h2>{user.name.first}</h2>
            <p>Idade: {user.dob.age}</p>
            <p>Sexo: {user.gender}</p>
            <p>Cidade: {user.location.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
