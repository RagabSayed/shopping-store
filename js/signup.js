class User {
    constructor(fristName, lastName, email, password, id, statues){
        this.fristName = fristName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.id = id;
        this.statues = statues;
    };
}
let usersData = localStorage.getItem("usersData")? JSON.parse(localStorage.getItem("usersData")): [];
// /////////////////// Handel Input Data///////////
let userData ={};
    function handelInputChange(name=e.target.name, value=e.target.value) {
        userData[name] = value.trim();
    }
// ////////////////////// Handel Form Submit /////////////////////
document.getElementById("signup-form").addEventListener("submit", function (e) {
    e.preventDefault();
    let user = new User();
    if (userData.fristName, userData.lastName, userData.email, userData.password) {
        if (usersData.find(user => user.email == userData.email)) {
            alert("This email is registered befor, Please go to log-in page or change email.")
        } else {
            for (var variable in user) {
                user[variable] = userData[variable];
            }
            user.id = usersData.length > 0? usersData[usersData.length - 1].id + 1: 1;
            user.statues = "Registered";
            usersData = [...usersData, user];
            localStorage.setItem("usersData", JSON.stringify(usersData));
            alert("Data is registered successfully!");
            setTimeout(() => {
                location.replace('/login.html');
            }, 1000);
        }
    } else {
        alert("You must fill all input data")
    }
})