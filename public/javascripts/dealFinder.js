const $findDealBtn = $(".find-deal-btn");

const findDealCall = async (e) => {
    e.preventDefault();
    console.log("Hello");
    const searchTerms = {
        gameTitle: "Skyrim",
    };

    const response = await fetch("api/apiCall/cheapsharkSearch", {
        method: "POST",
        body: JSON.stringify(searchTerms),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        // If successful, redirect the browser to the dashboard page
        // document.location.replace("/gameView");
        console.log("Call Successful");
    } else {
        alert("Please check your credentials and try again.");
    }
};

$findDealBtn.on("click", findDealCall);
