const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const users = [
{id:1, name: "Anamul", email: "anamul@gmail.com"},
{id:2, name: "Monsorul", email: "anamul@gmail.com"},
{id:3, name: "Mahfozul", email: "anamul@gmail.com"},
{id:4, name: "Maruf", email: "anamul@gmail.com"},
{id:5, name: "Saykat", email: "anamul@gmail.com"},
{id:6, name: "Monib", email: "anamul@gmail.com"}
];




//send data and also using query
app.get('/users', (req, res)=> {
    if(req.query.name){
        const query = (req.query.name).toLowerCase();
        const user = users.filter(user => user.name.toLowerCase().includes(query));
        res.send(user);
    }else{
        res.send(users);
    }
});



//posting data
app.post('/user', (req, res)=> {
    const user = req.body;
    user.id = users.length+1;
    users.push(user);
    res.send(user);
})


//using params
app.get('/user/:id', (req, res)=> {
    console.log(req.params.id)
    const user = users.find(user => user.id === parseInt(req.params.id));
    res.send(user)
})



app.listen(port, ()=> {
    console.log(`node project is running in port ${port}`);
});