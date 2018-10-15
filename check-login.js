var allowedUsers = [
    {
        userName: "daria",
        password: "d",
        fullName: "Дарія"
    }
];

function parseDataFromUrl() {

    var sPageURL = decodeURIComponent(window.location.search.substring(1));

    var dataFromUrl = sPageURL.split('&');

    var formData = {};

    for(var i=0;i<dataFromUrl.length;i++)
    {
        var item = dataFromUrl[i]; // "name=value"

        //item: "name=value" => parts: ["name", "value"]
        var parts = item.split("=");
        formData[parts[0]] = parts[1];
    }

    return formData;
}

function getUserIndexIfValid(userInfo, validUsersArray) {
    for(var i=0;i<validUsersArray.length;i++) {
        if(
            validUsersArray[i].userName.toLowerCase() == userInfo.username.toLowerCase()
            && validUsersArray[i].password == userInfo.pwd) {
            return i;
        }
    }
    return -1;
}

function logout() {
    console.log("logout called.");
    localStorage.removeItem('userData');
    window.location.href = "login.html";
}

var isUserValid = false;
var loggedInUser = null;

try {
    var userInfo = null;

    if(window.location.search != "") {
        userInfo = parseDataFromUrl();
        console.log("User info from url: ", userInfo);
    }
    else {
        userInfo = localStorage.getItem('userData');
        if(userInfo !== undefined) {
            userInfo = JSON.parse(userInfo);
        }
        console.log("User info from local storage: ", userInfo);
    }

    var userIndex = getUserIndexIfValid(userInfo, allowedUsers);

    if(userIndex >= 0) {
        isUserValid = true;
        loggedInUser = allowedUsers[userIndex];
        console.log("User logged in:", loggedInUser);
    }
}
catch(exObj) {
    console.log(exObj);
}

if( !isUserValid ) {
    console.error("User is not valid!", userInfo);
    window.location.href = "login.html?bad_user=1";
}
else {
    if(userInfo.remember == "on") {
        localStorage.setItem('userData', JSON.stringify(userInfo));
        console.log("Local storage set.", localStorage.getItem('userData'));
    }

    document.getElementById("userName").innerText = loggedInUser.fullName;
    document.getElementsByClassName("userPanel")[0].classList.add("loggedIn");

    document.getElementById("selectedCurrency").innerText = userInfo.currency;

    console.log("UI changed.");
}