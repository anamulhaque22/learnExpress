const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_User}:${process.env.DB_Password}@cluster0.ttpkp.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const servieceCollectin = client.db('geniusCarService').collection('services');
        const orderCollection = client.db('geniusCarService').collection('order');
        // Auth
        app.post('/login', async (req, res)=> {
            const user = req.body;
            var toke = jwt.sign({ foo: 'bar' }, 'shhhhh');
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '1d'
            });
            res.send({toke});
        })





        //all service
        app.get('/service', async (req, res) => {
            const query = {};
            const cursor = servieceCollectin.find(query);
            const services = await cursor.toArray();
            res.send(services);
        });


        //get single service
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
        app.delete('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await servieceCollectin.deleteOne(query);
            res.send(result);
        })



        //post order
        app.post('/order', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

        //get order
        app.get('/order', async (req, res) => {
            const query = req.query;
            const cursor = orderCollection.find(query);
            const result = await cursor.toArray();
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