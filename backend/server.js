const express = require('express');
const app = express();
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient

const connectionString = 'mongodb+srv://admin:admin@cluster0.h24pg.mongodb.net/products?retryWrites=true&w=majority'
MongoClient.connect(connectionString, { useUnifiedTopology: true }, (err, client) => {
    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('products')
    const itemsCollection = db.collection('items')

    const port = 5000
    app.use(cors({
        origin: "http://localhost:3000",
        credentials: true
    }))
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    app.listen(port, () => {
        console.log(`listening on:\n    localhost:${port}`);
    })

    // endpoints
    app.get('/', (req, res) => {
        res.send('Hello world')
    })

    app.post('/quotes', (req, res) => {
        itemsCollection.insertOne(req.body).then(res => {
            console.log(res);
        }).catch(err => console.log(err))
    })
})
