const $signupBtn = $("#signup-btn");
const $userName = $("#new-username");
const $userPassword = $("#new-user-password");
const $userPasswordCheck = $("#new-user-password-check");

// gets data to send in fetch call
const createCredentials = async (e) => {
    e.preventDefault();
    if ($userPassword.val().trim() !== $userPasswordCheck.val().trim()) {
        alert("Passwords do not match.");
    } else {
        if (
            $userName.val().trim().length >= 4 &&
            $userPassword.val().trim().length
        ) {
            const credentials = {
                user_name: $userName.val().trim(),
                user_password: $userPassword.val().trim(),
            };

            if (credentials.user_name && credentials.user_password) {
                const response = await fetch("/api/user/", {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });
                if (response.ok) {
                    // If successful, redirect the browser to the dashboard page
                    document.location.replace("/dashboard");
                } else {
                    alert("Something went wrong, please try again");
                }
            }
        } else {
            alert("Please check Requirements for each field.");
        }
    }
};

// triggers when the signup button is clicked
$signupBtn.on("click", createCredentials);
