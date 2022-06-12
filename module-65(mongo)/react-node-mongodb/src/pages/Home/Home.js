import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:5000/users")
        .then(res=> res.json())
        .then(data => setUsers(data));
    }, []);
    const deleteUser = (id)=>{
        const confirmation = window.confirm("Do you want to delete user?");
        if(confirmation){
            fetch(`http://localhost:5000/user/${id}`,{
                method:"DELETE"
            })
            .then(res => res.json())
            .then(data => {
                if(data.deletedCount>0){
                    const remainingUser = users.filter(user => user._id !== id);
                    setUsers(remainingUser);
                }
            });
        }
    }
    return (
        <div>
            <h2>This is home page</h2>
            <h4>User list</h4>
            {
                users.map(user => <li>Name: {user.name} <Link to={`/updateuser/${user._id}`}>Update user</Link> <button onClick={()=>deleteUser(user._id)}>X</button></li> )
            }
        </div>
    );
};

export default Home;