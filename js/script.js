// /////////// Get products data and draw them in HTML ////////////////////
let productHtml = document.querySelector("#product-sec");

// fetch('https://fakestoreapi.com/products')? fetch('https://fakestoreapi.com/products')
// .then(res=>res.json()).then(data => data.map(item => ({...item, cartQun: 0}))).then(data => localStorage.setItem("products",JSON.stringify(data))): null;
let getProducts = localStorage.getItem("products")? JSON.parse(localStorage.getItem("products")): [];
function drawProducts(items) {
    let oneItem = items.map(item => {
        return `
            <div class="card card-item my-3" key=${item.id}>
                <img src=${item.image} class="card-img-top" alt=${item.title} height="400">
                <div class="card-body card-data">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text prod-desc">${item.description}</p>
                    <a href="/product.html" class="btn btn-primary" onclick="showItemDetails(${item.id})">Show Details</a>
                    <strong class="d-block fs-2 fw-bold p-3 btn btn-outline-dark my-2" id="prod-price">${item.price}"$"</strong>
                    <div>
                        <button id="remov-cart" class="btn btn-outline-danger px-4 mt-4 fs-3 fw-bold" style="display:${item.cartQun==0?"none":"inline-block"}" onclick="removeFromCart(${item.id})">-</button>
                        <button id="add-cart" class="btn btn-outline-primary btn-lg float-end mt-4 fs-4 fw-bold" style="display:${item.cartQun==0?"block":"none"}" onclick="addToCart(${item.id})">Add To Cart</button>
                        <span class="btn btn-outline-dark px-4 mt-4 fs-3 fw-bold" style="display:${item.cartQun==0?"none":"inline-block"}">${item.cartQun}</span>
                        <button id="add-cart" class="btn btn-outline-success px-4 mt-4 fs-3 fw-bold" style="display:${item.cartQun==0?"none":"inline-block"}" onclick="changeQuntity(${item.id})">+</button>
                    </div>
                    
                </div>
            </div>
        `
    }).join(' ')
    productHtml.innerHTML = oneItem;
}
drawProducts(getProducts);

// ////////// Get product's Category and draw them in HTML ////////////////////
let category = [{categId:0, categName:"All Products"}]
for (let i = 0; i < getProducts.length; i++) {
    if (!(category.find(f => f.categName == getProducts[i].category))) {
        category.push({categId: category.length, categName: getProducts[i].category});
    }
}
let categoryHtml = document.querySelector(".category-html");
function drawCategory() {
    let xx = category.map(el => {
        return `
            <li class="fs-5 fw-bold table-hover one-categ" onclick="showCategProd(${el.categId})">${el.categName}</li>
        `
    }).join(' ');
    categoryHtml.innerHTML = xx;
}
drawCategory();

// ////////// filter show products by category ////////////////////
let productsData = getProducts;
function showCategProd(id) {
    let categ = category.find(fd => fd.categId == id);
    getProducts = categ.categId > 0? productsData.filter(flt => flt.category == categ.categName): productsData;
    drawProducts(getProducts);
}
// ////////// filter show products by Price ////////////////////
let startPrice = document.getElementById("start-price");
let endPrice = document.getElementById("end-price");
let cancelFilterBtn = document.getElementById("cancel-filter-btn");
let minPrice = Math.floor(getProducts.reduce((prv, cur) => prv <= cur.price? prv: prv = cur.price, getProducts[0].price));
let maxPrice = Math.ceil(getProducts.reduce((prev, curr) => prev >= curr.price? prev: prev = curr.price, getProducts[0].price));
function filterByPrice() {
    startPrice.value = minPrice;
    endPrice.value = maxPrice;
}
startPrice.onchange = () => minPrice = startPrice.value;
endPrice.onchange = () => maxPrice = endPrice.value;
function priceFilter() {
    getProducts = getProducts.filter(ftr => ftr.price >= minPrice).filter(fter => fter.price <= maxPrice);
    drawProducts(getProducts);
    cancelFilterBtn.style.display = "block";
}
function cancelPriceFilter() {
    drawProducts(productsData);
}

// ///////////////////////////// Get user data, Cart products data, Update products data in home ///////////////////////////
let getUsersData = localStorage.getItem('usersData')? JSON.parse(localStorage.getItem('usersData')): [];
let getCurentUser = getUsersData.find(user => user.statues == "LogIn");
let getCartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
let cartQuntity = document.getElementById("cart-quntity");

function updateProducts() {
    let userCartItems = getCartItems.filter(fl => fl.userId == getCurentUser.id);
    if (getCurentUser && userCartItems) {
        let totQun = userCartItems.reduce((a, b) => a + b.cartQun, 0);
        cartQuntity.innerText = totQun;
        for (var i = 0; i < getProducts.length; i++) {
            let xx = userCartItems.find(d => d.id == getProducts[i].id);
            getProducts[i].cartQun = xx? xx.cartQun: 0;
        }
    }
    drawProducts(getProducts); 
}
updateProducts()

// ///////////// Show one product details ///////////////////////
function showItemDetails (id) {
    let getOneProduct = getProducts.filter(f => f.id === id);
    getOneProduct && localStorage.setItem("oneProduct", JSON.stringify(getOneProduct));
}

// /////////////////// Add Product to Cart Fun ///////////////////////////////
function addToCart (id) {
    if (getCurentUser) {
        let getCartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
        let userCartItems = getCartItems.filter(fl => fl.userId == getCurentUser.id);
        let totQun = userCartItems.reduce((a, b) => a + b.cartQun, 0);
        let addedItem = getProducts.find(fn => fn.id == id);
        addedItem.cartQun = 1;
        addedItem.userId = getCurentUser.id;
        getProducts[getProducts.findIndex(fi => fi.id == id)].cartQun = 1;
        totQun += 1;
        cartQuntity.innerText = totQun;
        getCartItems = [...getCartItems, addedItem];
        localStorage.setItem("cartItems", JSON.stringify(getCartItems));
    } else {
        alert("You must log in to do that.");
        location.assign("/login.html");
    }
    drawProducts(getProducts);
}

// //////////////////// Increase qunatity of product in cart ////////////////////////
function changeQuntity(id) {
    let getCartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
    let userCartItems = getCartItems.filter(fl => fl.userId == getCurentUser.id);
    let totQun = userCartItems.reduce((a, b) => a + b.cartQun, 0);
    let itemInCart = userCartItems.find(fd => fd.id == id);
    if (itemInCart) {
        let itemQuantity = itemInCart.cartQun + 1;
        totQun += 1;
        cartQuntity.innerText = totQun;
        getProducts[getProducts.findIndex(fi => fi.id == id)].cartQun = itemQuantity;
        getCartItems[getCartItems.findIndex(fi => (fi.userId == getCurentUser.id && fi.id == id))].cartQun = itemQuantity;
        userCartItems[userCartItems.findIndex(fi => fi.id == id)].cartQun = itemQuantity;
        localStorage.setItem("cartItems", JSON.stringify(getCartItems));
    }
    drawProducts(getProducts);
}

// ///////////////// Decrease qunatity of product in cart ////////////////////////
function removeFromCart(id) {
    if (getCurentUser) {
        let getCartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
        let userCartItems = getCartItems.filter(fl => fl.userId == getCurentUser.id);
        let itemInCart = userCartItems.find(fd => fd.id == id);
        let totQun =  userCartItems.reduce((a, b) => a + b.cartQun, 0);
        if (itemInCart.cartQun > 0) {
            let itemQuantity = itemInCart.cartQun - 1;
            totQun -= 1;
            cartQuntity.innerText = totQun;
            getProducts[getProducts.findIndex(fi => fi.id == id)].cartQun = itemQuantity;
            getCartItems[getCartItems.findIndex(fi => (fi.userId == getCurentUser.id && fi.id == id))].cartQun = itemQuantity;
            getCartItems = getCartItems.filter(fr => fr.cartQun > 0);
            userCartItems[userCartItems.findIndex(fi => fi.id == id)].cartQun = itemQuantity;
            localStorage.setItem("cartItems", JSON.stringify(getCartItems));
        } 
    }
    drawProducts(getProducts);
}