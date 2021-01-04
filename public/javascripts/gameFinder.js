const $randSearchBtn = $(".rand-search-btn");

const randSearchCall = async (e) => {
    e.preventDefault();

    const searchTerms = {
        gameName: "Breath of the Wild",
    };

    const response = await fetch("api/apiCall/rawgGameSearch", {
        method: "POST",
        body: JSON.stringify(searchTerms),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        // document.location.replace("/gameView");
        console.log("Call complete");
        console.log(response);
        console.log(response.body);
    } else {
        alert("Please check your credentials and try again.");
    }
};

$randSearchBtn.on("click", randSearchCall);
