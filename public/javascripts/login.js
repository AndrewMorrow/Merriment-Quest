const $userName = $("#user-name");
const $userPassword = $("#user-password");
const $loginBtn = $("#login-btn");

// gets data from fields to make fetch call
const submitCredentials = async (e) => {
    e.preventDefault();
    if (
        $userName.val().trim().length >= 4 &&
        $userPassword.val().trim().length
    ) {
        const credentials = {
            user_name: $userName.val().trim(),
            user_password: $userPassword.val().trim(),
        };

        const response = await fetch("/api/user/login", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            // console.log("Call Successful");
            document.location.replace("/dashboard");
        } else {
            // alert("Please check your credentials and try again.");
            $("#infoIncorrectModal").modal("show");
        }
    } else {
        // alert("Please check requirements for each field.");
        $("#fieldRequiredLoginModal").modal("show");
    }
};

// triggers when login button is clicked
$loginBtn.on("click", submitCredentials);
