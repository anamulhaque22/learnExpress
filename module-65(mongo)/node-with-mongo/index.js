const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

app.use(cors());//use to communicate with different poart
app.use(express.json());

//database username and password
//firstmongo
//pKsP7HwwLNhicCQg

app.get('/', (req, res)=> {
    res.send("module 65 is about CRUD operation with mongodb");
})

const uri = "mongodb+srv://firstmongo:pKsP7HwwLNhicCQg@cluster0.ttpkp.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    await client.connect();
    const userCollection = client.db("foodExpress").collection('user');
    try{
        await client.connect();
        const userCollection = client.db('expressFood').collection('user');
        

        //send data database to cliend or somewhere
        app.get('/users', async(req, res)=>{
            const query = {};
            const cursor = userCollection.find(query);
            const user = await cursor.toArray();
            res.send(user);
        })

        //post the data or send data from cliend to server  and server to database
        app.post('/user', async (req, res)=>{
            console.log(req.body);
            const result = await userCollection.insertOne(req.body);
            res.send(result);
        })


        app.get('/user/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.findOne(query);
            res.send(result);
        })

        //delete user
        app.delete('/user/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })

    }finally{

    }
}
run().catch(console.dir);





/* async function run(){
    try{
        await client.connect();
        const userCollection = client.db("expressFood").collection("user");
        const user = {name: "Anamul Haque", email: "anamulhaque.ah00"};
        const result = await userCollection.insertOne(user);
        console.log(`User inserted with id: ${result.insertedId}`);
    }finally{
        //await client.close();
    }
}
run().catch(console.dir); */

app.listen(port, ()=> {
    console.log('Applicaton is running at', port)
})