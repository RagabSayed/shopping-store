// //////////// Get Data && Draw Cart's Products in cart page
let cartProductHtml = document.getElementById("cart-product-sec");
let getUsersData = localStorage.getItem('usersData')? JSON.parse(localStorage.getItem('usersData')): [];
let getCurentUser = getUsersData.find(user => user.statues == "LogIn");
let getCartItems = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
let cartQunt = document.getElementById("cart-qunt");
let userCartItems = getCurentUser && getCartItems.filter(fl => fl.userId == getCurentUser.id);

function drawCartProducts(cartItems) {
    let valShow = document.getElementById("val-show-h1");
    let totalValue = 0;
    let oneCartItem = cartItems.map((cartItem) => {
        totalValue += cartItem.cartQun * cartItem.price;
        return `
            <div class="card col-md-5 card-item my-3" key=${cartItem.id}>
                <img src=${cartItem.image} class="card-img-top" alt=${cartItem.title} height="400">
                <div class="card-body">
                    <h5 class="card-title">${cartItem.title}</h5>
                    <p class="card-text prod-desc">${cartItem.description}</p>
                    <a href="/product.html" class="btn btn-primary" onclick="showItemDetails(${cartItem.id})">Show Details</a>
                    <strong class="d-block fs-2 fw-bold p-3 btn btn-outline-dark my-2" id="prod-price">${cartItem.price}"$"</strong>
                    <div class="ms-auto">
                        <button id="remov-cart" class="btn btn-outline-danger px-4 mt-4 fs-3 fw-bold" onclick="removeFromCar(${cartItem.id})">-</button>
                        <span class="btn btn-outline-dark px-4 mt-4 fs-3 fw-bold">${cartItem.cartQun}</span>
                        <button id="add-cart" class="btn btn-outline-success px-4 mt-4 fs-3 fw-bold" onclick="changeQunt(${cartItem.id})">+</button>
                    </div>
                    <button id="add-cart" class="btn btn-outline-danger mx-auto btn-lg d-block mt-4 fs-4 fw-bold" onclick="deleteFromCart(${cartItem.id})">Delete From Cart</button>
                </div>
            </div>
        `
    }).join(' ')
    cartProductHtml.innerHTML = oneCartItem;
    valShow.innerText = `Total Value = ${totalValue} $`;
}
drawCartProducts(userCartItems);
let totQunt = userCartItems.reduce((a, b) => a + b.cartQun, 0);
    cartQunt.innerText = totQunt;

// //////////////////// Increase qunatity of product in cart ////////////////////////
function changeQunt(id) {
    let getCartProdcts = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
    let userCartProdcts = getCartProdcts.filter(fl => fl.userId == getCurentUser.id);
    totQunt = userCartProdcts.reduce((a, b) => a + b.cartQun, 0);
    let itemAtCart = userCartProdcts.find(fd => fd.id == id);
    if (itemAtCart) {
        let itemQuantity = itemAtCart.cartQun + 1;
        totQunt += 1;
        cartQunt.innerText = totQunt;
        getCartProdcts[getCartProdcts.findIndex(fi => (fi.userId == getCurentUser.id && fi.id == id))].cartQun = itemQuantity;
        userCartProdcts[userCartProdcts.findIndex(fi => fi.id == id)].cartQun = itemQuantity;
        localStorage.setItem("cartItems", JSON.stringify(getCartProdcts));
    }
    drawCartProducts(userCartProdcts);
}

// ///////////////// Decrease qunatity of product in cart ////////////////////////
function removeFromCar(id) {
    if (getCurentUser) {
        let getCartProdcts = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
        let userCartProdcts = getCartProdcts.filter(fl => fl.userId == getCurentUser.id);
        let itemAtCart = userCartProdcts.find(fd => fd.id == id);
        totQunt = userCartProdcts.reduce((a, b) => a + b.cartQun, 0);
        if (itemAtCart.cartQun > 0) {
            let itemQuant = itemAtCart.cartQun - 1;
            totQunt -= 1;
            cartQunt.innerText = totQunt;
            getCartProdcts[getCartProdcts.findIndex(fi => (fi.userId == getCurentUser.id && fi.id == id))].cartQun = itemQuant;
            getCartProdcts = getCartProdcts.filter(fr => fr.cartQun > 0);
            userCartProdcts[userCartProdcts.findIndex(fx => fx.id == id)].cartQun = itemQuant;
            userCartProdcts = userCartProdcts.filter(ft => ft.cartQun > 0);
            localStorage.setItem("cartItems", JSON.stringify(getCartProdcts));
        }
        drawCartProducts(userCartProdcts);
    }
}

// ////////// Delete product from Cart //////////////////
function deleteFromCart(id) {
    if (confirm("Are you wante really delete this product from cart?")) {
        let getCartProdcts = localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [];
        let userCartProdcts = getCartProdcts.filter(fl => fl.userId == getCurentUser.id);
        let deleteProduct = userCartProdcts.find(dn => dn.id == id)
        totQunt = userCartProdcts.reduce((a, b) => a + b.cartQun, 0);
        totQunt -= deleteProduct.cartQun;
        cartQunt.innerText = totQunt;
        getCartProdcts.splice(getCartProdcts.findIndex(fin => (fin.userId == getCurentUser.id && fin.id == id)), 1);
        userCartProdcts.splice(userCartProdcts.findIndex(fxn => fxn.id == id), 1);
        localStorage.setItem("cartItems", JSON.stringify(getCartProdcts));
        drawCartProducts(userCartProdcts);
    }
}