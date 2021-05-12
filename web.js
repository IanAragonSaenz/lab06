btnAdd.addEventListener('click', addProduct);
const txtName = document.getElementById("productName");
const txtPrice = document.getElementById("productPrice");
const btnAdd = document.getElementById("add");
const cart = document.getElementById("cart");
const totalLabel = document.getElementById("total");

products = [];
class Product{
    constructor(n, p){
        this.name = n;
        this.price = p;
    }
}

function addProduct(event){
    event.preventDefault();
    let name = txtName.value.trim();
    let price = txtPrice.value.trim();

    let validationMsg = validate(name, price);
    if (validationMsg != ''){
        alert(validationMsg);
        return;
    }
    
    let product = new Product(name, parseFloat(price));
    addProductToCart(product);
    updateList();
    updateTotal();
    prepareForm();
}

function updateList(){
    clearCart();
    products.forEach(product =>{
        let li = document.createElement('li');
        let namePart = document.createElement('span');
        namePart.appendChild(document.createTextNode(product.name));
        let pricePart = document.createElement('span');
        pricePart.appendChild(document.createTextNode(`$${product.price}`));

        // complete the remove functionality
        btnRemove = document.createElement("button");
        btnRemove.appendChild(document.createTextNode("Remove"));
        btnRemove.addEventListener("click", ()=>{
            removeProductFromCart(product);
            cart.removeChild(li);
            updateTotal();
        });

        li.appendChild(namePart);
        li.appendChild(document.createTextNode(': '));
        li.appendChild(pricePart);
        li.appendChild(btnRemove);

        cart.appendChild(li);
    });
}

function removeProductFromCart(product){
    // find the element
    let idx = products.indexOf(product);
    // remove the element (which position, how many elements)
    products.splice(idx,1);
    localStorage.setItem("products", JSON.stringify(products));
    if (products.length==0) localStorage.removeItem("products");
}

function clearCart(){
    while (cart.lastElementChild) cart.removeChild(cart.lastElementChild);
}

function updateTotal(){
    let sum = 0.0;
    products.forEach(p=>sum+=p.price);
    totalLabel.textContent = `Total: $ ${sum}`;
}

function addProductToCart(product){
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
}

function prepareForm(){
    txtName.value='';
    txtPrice.value='';
    txtName.focus();
}

if (localStorage.getItem('products')){
    products = JSON.parse(localStorage.getItem('products'));
    updateList();
    updateTotal();
    alert('We loaded your existing cart :)');
}

function validate(name, price){
    if (name === '') return 'Product name is needed';
    if (price === '') return `Price is needed for ${name}`;
    if (isNaN(price)) return 'A valid price is needed';
    return '';
}

function duplicatedProduct(name){
    // productFound = products.find(x => x.name===name);
    // if (product === undefined) then we did not find anything, so the product is not duplicated
    // if (productFound !== undefined) then the product is duplicated
    return products.find(x => x.name===name) !== undefined;
}
