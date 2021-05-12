const express = require('express');
const app = express();
var cors = require('cors');
const port = 3000;
const axios = require('axios').default;
app.use(cors());
var MongoClient = require('mongodb').MongoClient
var collection;

app.use(express.static('./'))

const uri = "mongodb+srv://wanderer:hahaesto123@cluster0.6qswt.mongodb.net/cartDB?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true}, { useNewUrlParser: true }, { connectTimeoutMS: 30000 }, { keepAlive: 1});
client.connect(err => {
	collection = client.db("cartDB").collection("products"); 
});

app.get('/', (req, res) => {
    res.sendFile("./shopping-cart.html", {root: __dirname});
});

app.route('/products').get(async function(req, res){  
    let products = await collection.find().toArray();
    res.send(products);
});

app.post('/removeProduct', function (req, res) {

    let nameParam = req.query.name;
	collection.deleteOne({
		name: nameParam
	}, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
	});
})


app.post('/addProduct', function (req, res) {

    let nameParam = req.query.name;
	let priceParam = req.query.price;
	let brandParam = req.query.brand;
   console.log(req.query);
	collection.insertOne({
		name: nameParam,
		price: priceParam,
		brand: brandParam,
	}, function(err, res) {
		if (err) throw err;
		console.log("1 document inserted");
	});

  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

