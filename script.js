// ===========================
// EMAIL VALIDATION
// ===========================

function emailIsValid(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===========================
// ERROR FUNCTIONS
// ===========================

function displayFieldError(id, message) {

    const element = document.getElementById(id);

    if (element) {
        element.style.display = "block";
        element.innerText = message;
    }
}   

function clearAllErrors() {

    document.querySelectorAll(".error-text").forEach(error => {
        error.style.display = "none";
        error.innerText = "";
    });
}

// ===========================
// FORM SWITCHING
// ===========================

function switchForm(formName) {

    document.querySelectorAll(".form-container")
        .forEach(form => form.classList.remove("active"));

    document.querySelectorAll(".tab-btn")
        .forEach(btn => btn.classList.remove("active"));

    if (formName === "register") {

        document.getElementById("register-form")
            .classList.add("active");

        document.getElementById("btn-tab-register")
            .classList.add("active");
    }

    if (formName === "login") {

        document.getElementById("login-form")
            .classList.add("active");

        document.getElementById("btn-tab-login")
            .classList.add("active");
    }
}

// ===========================
// PASSWORD SHOW / HIDE
// ===========================

function togglePasswordVisibility(inputId, icon) {

    const input = document.getElementById(inputId);

    if (input.type === "password") {

        input.type = "text";
        icon.innerHTML = "🙈";

    } else {

        input.type = "password";
        icon.innerHTML = "👁️";
    }
}

// ===========================
// FORGOT PASSWORD
// ===========================

function showForgotPassword(event) {

    event.preventDefault();

    document.querySelectorAll(".form-container")
        .forEach(form => form.classList.remove("active"));

    document.getElementById("forgot-password-form")
        .classList.add("active");
}

function hideForgotPassword() {

    document.querySelectorAll(".form-container")
        .forEach(form => form.classList.remove("active"));

    document.getElementById("login-form")
        .classList.add("active");

    document.getElementById("btn-tab-login")
        .classList.add("active");
}

// ===========================
// REGISTER
// ===========================

function handleRegister(event) {

    event.preventDefault();

    clearAllErrors();

    const username =
        document.getElementById("reg-username")
        .value.trim();

    const email =
        document.getElementById("reg-email")
        .value.trim();

    const password =
        document.getElementById("reg-password")
        .value;

    const confirmPassword =
        document.getElementById("reg-confirm-password")
        .value;

    let hasError = false;

    if (username.length < 3) {

        displayFieldError(
            "reg-username-error",
            "Username must be at least 3 characters"
        );

        hasError = true;
    }

    if (!emailIsValid(email)) {

        displayFieldError(
            "reg-email-error",
            "Invalid Email Address"
        );

        hasError = true;
    }

    if (password.length < 6) {

        displayFieldError(
            "reg-password-error",
            "Password must be at least 6 characters"
        );

        hasError = true;
    }

    if (password !== confirmPassword) {

        displayFieldError(
            "reg-password-error",
            "Passwords do not match"
        );

        hasError = true;
    }

    if (hasError) return;

    fetch("auth.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "register",
            username: username,
            email: email,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {

        if (data.status === "success") {

            console.log(data.message);

            document.querySelector("#register-form form")
                .reset();

            switchForm("login");

        } else {

            alert(data.message);
        }
    })
    .catch(error => {

        console.error(error);
        console.log(error);

        console.log("Server Error");
    });
}

// ===========================
// LOGIN
// ===========================

function handleLogin(event) {

    event.preventDefault();

    clearAllErrors();

    const loginId =
        document.getElementById("login-id")
        .value.trim();

    const password =
        document.getElementById("login-password")
        .value;

    fetch("auth.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "login",
            loginId: loginId,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {

        if (data.status === "success") {

            document.getElementById("display-username")
                .textContent =
                data.username.toUpperCase();

            document.getElementById("prof-name")
                .textContent =
                data.email;

            document.getElementById("form-tabs")
                .style.display = "none";

            document.getElementById("login-form")
                .classList.remove("active");

            document.getElementById("dashboard-view")
                .classList.add("active");

            document.getElementById("main-container")
                .classList.add("dashboard-active");

            switchDashboardView("landing");

        } else {

            if (data.field) {

                displayFieldError(
                    data.field,
                    data.message
                );

            } else {

                alert(data.message);
            }
        }
    })
    .catch(error => {

        console.error(error);

        alert("Server Error");
    });
}

// ===========================
// RESET PASSWORD
// ===========================

function handleResetPassword(event) {

    event.preventDefault();

    clearAllErrors();

    const email =
        document.getElementById("reset-email")
        .value.trim();

    if (!emailIsValid(email)) {

        displayFieldError(
            "reset-email-error",
            "Invalid Email Address"
        );

        return;
    }

    fetch("auth.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            action: "reset_password",
            email: email
        })
    })
    .then(response => response.json())
    .then(data => {

        if (data.status === "success") {

            alert(data.message);

            switchForm("login");

        } else {

            displayFieldError(
                data.field,
                data.message
            );
        }
    })
    .catch(error => {

        console.error(error);

        alert("Server Error");
    });
}

// ===========================
// DASHBOARD VIEWS
// ===========================

function switchDashboardView(view) {

    document.querySelectorAll(".dash-subview")
        .forEach(section =>
            section.classList.remove("active")
        );

    const target =
        document.getElementById(
            "dash-" + view
        );

    if (target) {
        target.classList.add("active");
    }
}

// ===========================
// LOGOUT
// ===========================

function handleLogout() {

    location.reload();
}