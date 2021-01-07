module.exports = {
    format_date: (date) => {
        return date.toLocaleDateString();
    },
    check_element: (elemId) => {
        return document.getElementById(`${elemId}`).innerHTML === "";
    },
};
