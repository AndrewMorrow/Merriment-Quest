const logout = async () => {
    const response = await fetch("api/user/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        document.location.replace("/home");
    } else {
        alert(response.statusText);
    }
};

document.querySelector("#logout-btn").addEventListener("click", logout);
