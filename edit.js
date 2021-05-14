const productId = '<%= productId %>';
const txtName = document.getElementById("productName");
const txtPrice = document.getElementById("productPrice");
const txtBrand = document.getElementById("productBrand");
const btnSave = document.getElementById("save");
btnSave.addEventListener('click', editProduct);

class Product{
    constructor(i, n, p, b){
		this.id = i;
        this.name = n;
        this.price = p;
		this.brand = b;
    }
}

loadProductData();

function editProduct(event){
    event.preventDefault();
    let name = txtName.value.trim();
    let price = txtPrice.value.trim();
	let brand = txtBrand.value.trim()

    let validationMsg = validate(name, price);
    if (validationMsg != ''){
        alert(validationMsg);
        return;
    }
    
    let product = new Product(name, parseFloat(price), brand);
	axios.put( 
		'http://127.0.0.1:3000/product/${productId}', 
		{
			name: name,
			price: product.price,
			brand: brand,
		}
	)
	.then(response => {
		console.log(response);
		alert(`Product updated successfully`);
		window.location.replace('http://127.0.0.1:3000/');
	})
	.catch(error => {
		console.log(error.response.data)
		alert(`Problem when updating product ${error.response.data}`);
	});

    prepareForm();
}


function loadProductData(){
	let url = 'http://127.0.0.1:3000/product/' + productId;
            axios.get(url)
            .then(response => {
                console.log(response);
                txtName.value = response.data.name;
                txtPrice.value = response.data.price;
                txtBrand.value = response.data.brand;
            })
            .catch(error => {
                console.log(error.response.data);
                alert(`Problem when loading data for product ${error.response.data}`);
            });
        }

function validate(name, price){
    if (name === '') return 'Product name is needed';
    if (price === '') return `Price is needed for ${name}`;
    if (isNaN(price)) return 'A valid price is needed';
    return '';
}

