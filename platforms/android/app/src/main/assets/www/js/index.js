// nur zum debuggen, also check, ob wir irgendwas am localstorage haben
window.addEventListener("DOMContentLoaded", (event) => {
    readJsonObjFromFile();
    });

// check online / offline
// wenn online -> lade daten vom server + speichere in localstorage
window.addEventListener('load', async function(e) {
    if (navigator.onLine) {
        console.log('We\'re online!');
        await loadTickets();
    } else {
        console.log('We\'re offline...');
    }
}, false);

// button -> App Starten
document.getElementById('welcome').addEventListener('click', function() {
    document.location.href = 'home.html'
});

// auslesen localstorage
function readJsonObjFromFile() {
    const checker = localStorage.getItem("tickets");
    console.log("tickets im internen Speicher: ", JSON.parse(JSON.stringify(checker)));
    console.log("Anzahl an Einträgen: ", Object.keys(checker).length);
};

// speichern localstorage
function saveJsonObjToFile(file, filename) {
    localStorage.setItem(filename, JSON.stringify(file));
    console.log('Daten erfolgreich gespeichert');
    readJsonObjFromFile();
};

// GET vom server für Tickets
async function loadTickets() {
    try {
        const response = await fetch('http://10.0.2.2:3000/getTickets');
        const tickets = await response.json();
        console.log(response);
        // Tickets speichern
        console.log('Daten erfolgreich vom Server geholt', JSON.stringify(tickets));
        saveJsonObjToFile(tickets, "tickets");
    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    };
}