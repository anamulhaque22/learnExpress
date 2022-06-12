import './App.css';
import { useState, useEffect } from 'react';
function App() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);



  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    //post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        const newUser = [...users, data];
        setUsers(newUser);
      })
  }
  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" required />
        <input type="email" name="email" id="" required />
        <input type="submit" value="Submit" />
      </form>
      <ul>
        {
          users.map(user => <li key={user.id}>Id: {user.id} <br /> Name: {user.name}</li>)
        }
      </ul>
    </div>
  );
}

export default App;
