const express = require('express');
const app = express();
var cors = require('cors');
const port = 3000;
const axios = require('axios').default;
app.use(cors());
var MongoClient = require('mongodb').MongoClient
var collection;

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

app.post('/product', function (req, res) {

    let nameParam = req.query.name;
	collection.deleteOne({
		name: nameParam
	}, function(err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
	});
})

/* No creo que necesitemos un get en este lab
app.get('/pokemon', function (req, res) {

    let nameParam = req.query.name;
    const URL = 'https://pokeapi.co/api/v2/pokemon/';
	const prefixImage = "https://pokeres.bastionbot.org/images/pokemon/";

    axios.get(URL+nameParam)
    .then(pokemon_response => {
		var pokemonData = pokemon_response.data;

		var type = pokemonData.types["0"].type.name;
		var weigth =  pokemonData.weight;
		var img = prefixImage + pokemonData.id + ".png";
		var name = pokemonData.name;
		
		var str = JSON.stringify({name: name, img: img, weigth: weigth, type: type});
		collection.insertOne({
			name: name,
			img: img,
			weigth: weigth,
			type: type
		}, function(err, res) {
			if (err) throw err;
			console.log("1 document inserted");
		});
		
        console.log("I am making a request to " + URL);
        res.send(str);
    }).catch(function(error){
        console.log(error);
        res.status(404).send('the pokemon does not exist');
    });
  })
 */

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});

