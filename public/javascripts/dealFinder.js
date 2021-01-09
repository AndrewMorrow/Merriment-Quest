const $findDealBtn = $(".find-deal-btn");
const $gameSearchInput = $("#gameSearch");

const findDealCall = async (e) => {
    e.preventDefault();
    let baseQuery = "/cheapsharkSearch?";
    const searchTitle = $gameSearchInput.val();

    const query = `${baseQuery}title=${searchTitle}`;

    window.location.href = query;
};

$findDealBtn.on("click", findDealCall);
