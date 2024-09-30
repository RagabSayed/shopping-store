
let usersData = localStorage.getItem('usersData')? JSON.parse(localStorage.getItem('usersData')): [];
let curentUser = usersData.find(user => user.statues == "LogIn");
let welcUser = document.getElementById("welc-user");
function welcom() {
    if (curentUser) {
        welcUser.innerText = `Welcom, ${curentUser.fristName} ${curentUser.lastName}`;
        document.getElementById("signup").style.display = "none";
        document.getElementById("login").style.display = "none";
        document.getElementById("logout").style.display = "block";
    }
}
welcom()
function handelLogout() {
    usersData[usersData.findIndex(user => user.id == curentUser.id)].statues = "Registered";
    localStorage.setItem("usersData", JSON.stringify(usersData));
    // welcUser.innerText = "";
    document.getElementById("signup").style.display = "block";
    document.getElementById("login").style.display = "block";
    document.getElementById("logout").style.display = "none";
    welcUser.parentElement.style.display = "none";
    location.assign("/index.html");
    localStorage.removeItem("totQun");
}