const $findDealBtn = $(".find-deal-btn");
const $gameSearchInput = $("#gameSearch");

const findDealCall = async (e) => {
    e.preventDefault();
    let baseQuery = "/cheapsharkSearch?";
    const searchTitle = $gameSearchInput.val();

    const query = `${baseQuery}&title=${searchTitle}`;

    window.location.href = query;
    // const response = await fetch(query, {
    //     method: "GET",
    //     headers: { "Content-Type": "application/json" },
    // });
    // if (response.ok) {
    //     // If successful, redirect the browser to the dashboard page
    //     // document.location.replace("/gameView");
    //     console.log("Call Successful");
    // } else {
    //     alert("Please check your credentials and try again.");
    // }
};

$findDealBtn.on("click", findDealCall);
