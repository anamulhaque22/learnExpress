import './App.css';
import {useEffect, useState} from 'react';
function App() {
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data));
  }, []);


  const handleSubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email}
    fetch('http://localhost:5000/user', {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => setUsers([...users, data]));
  }
  return (
    <div className="App">
      <ul>
        {
          users.map(user => <li key={user.id}>Id: {user.id} <br /> Name: {user.name}</li>)
        }
      </ul>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" required/>
        <input type="email" name="email" id="" required />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default App;
