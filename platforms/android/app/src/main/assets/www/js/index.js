document.getElementById('welcome').addEventListener('click', function() {
    document.location.href = 'home.html'
});

function saveJsonObjToFile(tickets) {
    localStorage.setItem("tickets", JSON.stringify(tickets))
};

function readJsonObjFromFile() {
    const checker = localStorage.getItem("tickets");
    console.log("tickets im internen Speicher: ", JSON.parse(JSON.stringify(checker)));
};