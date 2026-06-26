  # User Authentication System (PHP & MySql)

A clean, modern, and secure Full-Stack User Authentication System. This project features robust functionalities for user registration, login, and password resetting, along with an interactive user dashboard. It is built entirely using pure HTML, CSS, JavaScript (Frontend), and PHP with MySQL (Backend).

---

## ✨ Features

*   **User Registration:** Validates username (minimum 3 characters), ensures unique email addresses, and enforces a secure password length (minimum 6 characters).
*   **Secure Login:** Allows users to sign in using either their username or email address[cite: 1, 4]. Passwords are authenticated securely using PHP's standard verification.
*   **Password Hashing:** Protects credentials by hashing user passwords using the secure `PASSWORD_DEFAULT` (Bcrypt) mechanism before storing them[cite: 1].
*   **Password Reset Verification:** Checks for existing email records to securely process reset requests[cite: 1].
*   **Interactive Dashboard:** Provides a responsive single-page interface displaying user profile details and settings tabs upon successful login[cite: 4, 5].
*   **Modern UI Layout:** Features a customized dark-themed design with interactive eye-icon toggles to easily show or hide passwords[cite: 4, 5, 6].

---

## 📂 Project Structure

```text
├── index.html       # The central single-page interface layout
├── style.css        # Custom dark-theme styling sheet and layouts
├── script.js        # Frontend validation and AJAX Fetch API communication logic
├── db.php           # Database connection handler configuration
├── create_db.php    # Database and table initialization utility setup
├── auth.php         # Central API controller handling registration, login, & resets
└── test.php         # Basic script to test raw server database connectivity
