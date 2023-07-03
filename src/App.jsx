import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { PiGenderMaleBold, PiGenderFemaleBold } from "react-icons/pi";

function App() {
  const url = "https://api.randomuser.me/?results=3";
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="App">
      <div className="card-container">
        {users.map((user) => (
          <div
            className="card"
            key={user.login.username}
            onClick={() => openModal(user)}
          >
            <img
              src={user.picture.large}
              alt="imagens"
              className="card-image"
            />
            <div className="card-content">
              <h2 className="card-title">
                {user.name.first} {user.name.last}
              </h2>
              <p className="card-text">Idade: {user.dob.age}</p>
              <p className="card-text">Cidade: {user.location.city}</p>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <button onClick={closeModal}>X</button>
            <i className="icon">
              {" "}
              {selectedUser.gender === "male" ? (
                <PiGenderMaleBold className="gender-icon" />
              ) : (
                <PiGenderFemaleBold className="gender-icon" />
              )}
            </i>
            <img
              src={selectedUser.picture.large}
              alt={selectedUser.name.first}
              className="modal-image"
            />
            <div className="modal-content">
              <h2 className="modal-title">
                {selectedUser.name.first} {selectedUser.name.last}
              </h2>
              <p>Idade: {selectedUser.dob.age}</p>
              <p>Cidade: {selectedUser.location.city}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
