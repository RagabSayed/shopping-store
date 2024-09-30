
let productData = document.getElementById("product-data");
let getOneProduct = localStorage.getItem("oneProduct")? JSON.parse(localStorage.getItem("oneProduct")): [];
function drawOneProduct(items) {
    let oneItem = items.map(item => {
        return `
            <div class="card col-11" key=${item.id}>
                <img src=${item.image} class="card-img-top" alt=${item.title} height="400">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <strong class="d-block fs-2 fw-bold p-3 btn btn-outline-dark my-2" id="prod-price">${item.price}"$"</strong>
                    <button class="btn btn-outline-primary btn-lg float-end" onclick="addToCart(${item.id})">Add To Cart</button>
                </div>
            </div>
        `
    }).join(' ')
    productData.innerHTML = oneItem;
}
drawOneProduct(getOneProduct);

let getUsersData = localStorage.getItem('usersData')? JSON.parse(localStorage.getItem('usersData')): [];
let getCurentUser = getUsersData.find(user => user.statues == "LogIn");
let quntCart = document.getElementById("qunt-cart");
function addToCart (id) {
    if (getCurentUser) {
        let getCartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
        let userCartItems = getCartItems.filter(fl => fl.userId == getCurentUser.id);
        let totQun = userCartItems.reduce((a, b) => a + b.cartQun, 0);
        let addedItem = getOneProduct.find(fn => fn.id == id);
        addedItem.cartQun = 1;
        addedItem.userId = getCurentUser.id;
        getOneProduct[getOneProduct.findIndex(fi => fi.id == id)].cartQun = 1;
        totQun += 1;
        quntCart.innerText = totQun;
        getCartItems = [...getCartItems, addedItem];
        localStorage.setItem("cartItems", JSON.stringify(getCartItems));
        location.assign("/cart.html");
    } else {
        alert("You must log in to do that.");
        location.assign("/login.html");
    }
    drawOneProduct(getOneProduct);
    
}