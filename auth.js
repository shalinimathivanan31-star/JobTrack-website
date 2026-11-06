
// Demo Signup
function signupUser(event) {
    event.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some(user => user.email === email)) {
        alert("This email is already registered!");
        return;
    }

    users.push({
        name: name,
        email: email,
        password: password
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account Created Successfully!");

    window.location.href = "login.html";
}


// Demo Login
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function(item) {
        return item.email === email && item.password === password;
    });

    if (user) {
        localStorage.setItem("loggedInUser", JSON.stringify({
            name: user.name,
            email: user.email
        }));

        alert("Login Successful!");

        window.location.href = "index.html";
    } else {
        alert("Invalid Email or Password!");
    }
}


// Demo Logout
function logoutUser() {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
}
// Protect Dashboard
if (
    window.location.pathname.endsWith("index.html") &&
    !localStorage.getItem("loggedInUser")
) {
    window.location.href = "login.html";
}
// Display User Details
const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (loggedInUser) {
    const nameElement = document.getElementById("userName");
    const emailElement = document.getElementById("userEmail");

    if (nameElement) {
        nameElement.textContent = "Welcome, " + loggedInUser.name + "!";
    }

    if (emailElement) {
        emailElement.textContent = loggedInUser.email;
    }
}