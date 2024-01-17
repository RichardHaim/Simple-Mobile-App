import * as common from './common.js';


// check online / offline
// wenn online -> lade daten vom server + speichere in localstorage
window.addEventListener('load', async function(e) {
    common.readAllFiles();
    if (navigator.onLine) {
        console.log('We\'re online!');
        await loadTickets();
        await loadMitarbeiter();
        await loadProblemkategorie();
        await loadSupportteam();
        await loadTicketstatus();
    } else {
        console.log('We\'re offline...');
    }
}, false);

// button -> App Starten
document.getElementById('welcome').addEventListener('click', function() {
    document.location.href = 'home.html'
});


/*
// GET vom server für Tickets
async function loadData() {
    server_functions = ['getTickets',
                        'getMitarbeiter',
                        'getProblemkategorie',
                        'getSupportteam']
    try {
        const response = await fetch('http://10.0.2.2:3000/getTickets');
        const data = await response.json();
        console.log(response);
        // Tickets speichern
        console.log('Daten erfolgreich vom Server geholt', JSON.stringify(data));
        common.saveJsonObjToFile(data, "tickets");
    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    };
}
*/




// GET vom server für Tickets
async function loadTickets() {
    try {
        const response = await fetch('http://10.0.2.2:3000/getTickets');
        const data = await response.json();
        console.log(response);
        // Tickets speichern
        console.log('Daten erfolgreich vom Server geholt', JSON.stringify(data));
        common.saveJsonObjToFile(data, "tickets");
    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    };
}

// GET vom server für Mitarbeiter
async function loadMitarbeiter() {
    try {
        const response = await fetch('http://10.0.2.2:3000/getMitarbeiter');
        const data = await response.json();
        console.log(response);
        // speichern
        console.log('Mitarbeiter erfolgreich vom Server geholt', JSON.stringify(data));
        common.saveJsonObjToFile(data, "mitarbeiter");
    } catch (error) {
        console.error('Fehler beim Laden der Mitarbeiter:', error);
    };
}

// GET vom server für Problemkategorie
async function loadProblemkategorie() {
    try {
        const response = await fetch('http://10.0.2.2:3000/getProblemkategorie');
        const data = await response.json();
        console.log(response);
        // speichern
        console.log('Problemkategorien erfolgreich vom Server geholt', JSON.stringify(data));
        common.saveJsonObjToFile(data, "problemkategorie");
    } catch (error) {
        console.error('Fehler beim Laden der Problemkategorien:', error);
    };
}

// GET vom server für SopportTeam
async function loadSupportteam() {
    try {
        const response = await fetch('http://10.0.2.2:3000/getSupportteam');
        const data = await response.json();
        console.log(response);
        // speichern
        console.log('Supportteam erfolgreich vom Server geholt', JSON.stringify(data));
        common.saveJsonObjToFile(data, "supportteam");
    } catch (error) {
        console.error('Fehler beim Laden der Supportteams:', error);
    };
}

// GET vom server für TicketStatus
async function loadTicketstatus() {
    try {
        const response = await fetch('http://10.0.2.2:3000/getTicketstatus');
        const data = await response.json();
        console.log(response);
        // speichern
        console.log('Ticketstatus erfolgreich vom Server geholt', JSON.stringify(data));
        common.saveJsonObjToFile(data, "ticketstatus");
    } catch (error) {
        console.error('Fehler beim Laden der Ticketstatus:', error);
    };
}