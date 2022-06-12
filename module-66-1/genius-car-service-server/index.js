const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.ttpkp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const servieceCollectin = client.db('expressFood').collection('user');

        //all service
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = servieceCollectin.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });


        //single service
        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servieceCollectin.findOne(query);
            res.send(service);
        });


        //post single sercie
        app.post('/service', async (req, res) => {
            const newService = req.body;
            const result = await servieceCollectin.insertOne(newService);
            res.send(result);
        })
        

        //delete
        app.delete('/service/:id', async(req, res)=> {
            const id = req.params.id;
            const query = {_id:ObjectId(id)};
            const result = await servieceCollectin.deleteOne(query);
            res.send(result);
        })

    } finally {
        //await client.close();
    }
};
run().catch(console.dir);

app.listen(port, () => {
    console.log("Applicaton is running ", port);
});