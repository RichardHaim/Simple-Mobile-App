window.addEventListener("DOMContentLoaded", (event) => {
    const checker = localStorage.getItem("tickets");
    console.log("tickets im internen Speicher: ", JSON.parse(JSON.stringify(checker)));
    console.log("Anzahl an Einträgen: ", Object.keys(checker).length);
    });

document.getElementById('welcome').addEventListener('click', function() {
    document.location.href = 'home.html'
});

/*
function readJsonObjFromFile() {
    const checker = localStorage.getItem("tickets");
    console.log("tickets im internen Speicher: ", JSON.parse(JSON.stringify(checker)));
};
*/