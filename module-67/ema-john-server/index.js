const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

require('dotenv').config();

//middleware
app.use(cors());//to communicate with different port
app.use(express.json());//parse request body data



const uri = `mongodb+srv://${process.env.DATABASE_USER_NAME}:${process.env.DATABASE_USER_PASSWORD}@cluster0.uorv2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();
        const productCollection = client.db('emaJohn').collection('product');

        app.get('/product', async (req, res) => {
            const page = parseInt(req.query.page);
            const numOfProduct = parseInt(req.query.size);
            console.log("page ",page," Num of Pro: ", numOfProduct);
            const query = {};
            const cursor = productCollection.find(query);
            let products;
            if (page || numOfProduct) {
                products = await cursor.skip(page * numOfProduct).limit(numOfProduct).toArray();
            } else {
                products = await cursor.toArray();
            }
            res.send(products);
        });

        app.get('/pagination', async (req, res) => {
            const count = await productCollection.estimatedDocumentCount();
            res.send({ count });
        })
    } finally {

    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send("Ema-Jhon applicatin ")
});

app.listen(port, () => {
    console.log("Ema-John Applicatio running at port: ", port);
});