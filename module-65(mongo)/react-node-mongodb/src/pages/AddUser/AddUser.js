import React, { useState } from 'react';

const AddUser = () => {
    const [userId, setUserId] = useState({});
    const handelAddUser = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const user = { name, email };
        fetch('http://localhost:5000/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => setUserId(data));
    }

    return (
        <>
            <form onSubmit={handelAddUser}>
                <input type="text" name="name" id="" required /> <br />
                <input type="email" name="email" id="" required /><br />
                <input type="submit" value="Add User" />
            </form>
            <p>Data is inserted: id {userId.insertedId}</p>
        </>
    );
};

export default AddUser;