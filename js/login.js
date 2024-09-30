
let usersData = localStorage.getItem('usersData')? JSON.parse(localStorage.getItem('usersData')): [];

let loginData ={};
function handelloginChange(name=e.target.name, value=e.target.value) {
    loginData[name] = value.trim();
}

document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault()
    if (loginData.email && loginData.pswd) {
        let curentUser = usersData.find(user => user.email === loginData.email);
        console.log(curentUser);
        if (curentUser && loginData.email == curentUser.email && loginData.pswd == curentUser.password) {
            curentUser.statues = "LogIn";
            usersData[usersData.findIndex(user => user.id == curentUser.id)].statues = "LogIn";
            localStorage.setItem("usersData", JSON.stringify(usersData));
            alert(`Wlcome ${curentUser.fristName}`);
            location.assign("/index.html");
        } else {
            alert("Email or password is wronge!")
        }
    } else{
        alert("You must fill all input data")
    }
})