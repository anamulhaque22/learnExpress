import React, { useState } from 'react';

const Home = () => {
    const [users, setUsers] = useState([]);
    const handleSubmit = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = {name, email};

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
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" id="" required />
                <input type="email" name="email" id="" required />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Home;