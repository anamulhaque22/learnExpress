const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post('/user', (req, res) => {
    const user = req.body;
    user.id = users.length +1;
    users.push(user);
    res.send(user)
});



app.get('/', (req, res)=>{
    res.send('Hyyy!! First node appliction');
});

const users = [
    {id:'1', name: 'Anamul'},
    {id:'2', name: 'Akash'},
    {id:'3', name: 'Saykat'},
    {id:'4', name: 'Sakib'},
    {id:'5', name: 'Monsorul'}
]
app.get('/users', (req, res)=> {
    if(req.query.name){
        const que = (req.query.name).toLowerCase();
        const metch = users.filter(user => user.name.toLowerCase().includes(que));
        res.send(metch);
    }else{
        res.send(users);
    }
});






app.get('/user/:id', (req, res)=> {
    console.log(req.params)
    const user = users.find(u => u.id === req.params.id);
    res.send(user)
});
app.listen(port, ()=> {
    console.log(`Lesting to the port ${port}`)
})