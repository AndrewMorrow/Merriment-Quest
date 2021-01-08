const $randSearchBtn = $(".rand-search-btn");
const $actionCheckbox = $("#action");
const $adventureCheckbox = $("#adventure");
const $strategyCheckbox = $("#strategy");
const $pcCheckbox = $("#pc");
const $xboxCheckbox = $("#xbox");
const $ps4Checkbox = $("#ps4");
const $switchCheckbox = $("#switch");
const $singleCheckbox = $("#single");
const $multiCheckbox = $("#multi");
const $firstCheckbox = $("#first");
const $thirdCheckbox = $("#third");

console.log($actionCheckbox);
const randSearchCall = async (e) => {
    e.preventDefault();

    let baseQuery = "/gameDealFinder?";
    // let baseQuery = "/rawgGameSearch?";
    let genres = [];
    let platforms = [];
    let tags = [];

    if ($actionCheckbox[0].checked) {
        genres.push("action");
    }
    if ($adventureCheckbox[0].checked) {
        genres.push("adventure");
    }
    if ($strategyCheckbox[0].checked) {
        genres.push("strategy");
    }
    if ($pcCheckbox[0].checked) {
        platforms.push(4);
    }
    if ($xboxCheckbox[0].checked) {
        platforms.push(1);
    }
    if ($ps4Checkbox[0].checked) {
        platforms.push(18);
    }
    if ($switchCheckbox[0].checked) {
        platforms.push(7);
    }
    if ($singleCheckbox[0].checked) {
        tags.push("singleplayer");
    }
    if ($multiCheckbox[0].checked) {
        tags.push("multiplayer");
    }
    if ($firstCheckbox[0].checked) {
        tags.push("first-person");
    }
    if ($thirdCheckbox[0].checked) {
        tags.push("third-person");
    }

    let query = `${baseQuery}genres=${genres.join(
        ","
    )}&platforms=${platforms.join(",")}&tags=${tags.join(",")}`;

    window.location.href = query;
};

$randSearchBtn.on("click", randSearchCall);
