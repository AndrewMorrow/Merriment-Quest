const $addWatchBtn = $(".add-watch-btn");
const $gameName = $(".game-name");

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
        // If successful, redirect the browser to the dashboard page
        // document.location.replace("/gameView");
        console.log("Call Successful");
    } else {
        alert("Please check your credentials and try again.");
    }
};

$addWatchBtn.on("click", addNewWatch);
