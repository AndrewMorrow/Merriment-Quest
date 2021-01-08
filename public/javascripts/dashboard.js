const $deleteBtn = $(".deleteBtn");

const deleteWatch = async function (e) {
    e.preventDefault();

    const id = e.target.id;

    const response = await fetch(`/api/watchlist/delete/${id}`, {
        method: "DELETE",
    });
    if (response.ok) {
        // If successful, refresh the dashboard page
        console.log("Call Successful");
        location.reload();
    } else {
        alert("Something went wrong please try again.");
    }
};

$deleteBtn.on("click", deleteWatch);
