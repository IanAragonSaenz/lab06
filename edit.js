const txtName = document.getElementById("productName");
const txtPrice = document.getElementById("productPrice");
const txtBrand = document.getElementById("productBrand");
const btnAdd = document.getElementById("add");
btnAdd.addEventListener('click', saveProduct);

var name;
products = [];
class Product{
    constructor(n, p, b){
        this.name = n;
        this.price = p;
		this.brand = b;
    }
}

txtName.value = name;



function validate(name, price){
    if (name === '') return 'Product name is needed';
    if (price === '') return `Price is needed for ${name}`;
    if (isNaN(price)) return 'A valid price is needed';
    return '';
}

/* probably not needed
function duplicatedProduct(name){
    // productFound = products.find(x => x.name===name);
    // if (product === undefined) then we did not find anything, so the product is not duplicated
    // if (productFound !== undefined) then the product is duplicated
    return products.find(x => x.name===name) !== undefined;
} */
