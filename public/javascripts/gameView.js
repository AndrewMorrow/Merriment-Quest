const $addWatchBtn = $(".add-watch-btn");
const $gameName = $(".game-name");
const $tryAgainBtn = $(".tryAgain");

const addNewWatch = async (e) => {
    e.preventDefault();

    const gameData = {
        game_name: $gameName.text(),
    };

    // console.log(gameData);
    const response = await fetch("api/watchlist/create", {
        method: "POST",
        body: JSON.stringify(gameData),
        headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
        // console.log("Call Successful");
        // alert("Your game was successfully added to the watchlist.");
        $("#watchlistAdd").modal("show");
    } else {
        alert("Something went wrong, please try again.");
    }
};

const reloadPage = async (e) => {
    e.preventDefault();

    location.reload().scrollTop(0, 0);
};

$addWatchBtn.on("click", addNewWatch);

$tryAgainBtn.on("click", reloadPage);
