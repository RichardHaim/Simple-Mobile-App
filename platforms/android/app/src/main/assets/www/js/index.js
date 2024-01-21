import * as common from './common.js';

// check online / offline
// wenn online UND initial -> lade daten vom server + speichere in localstorage
window.addEventListener('load', async function() {
    showLoadingPopup(true); // anzeigen des load pop ups wenn daten laden

    // push and clear newTicketQUEUE if not empty:
    const online = await common.onlinechecker();
    const queueNotEmpty = localStorage.getItem('newTicketsQUEUE');
    if ( queueNotEmpty !== null && online ) {
        const payload = common.readJsonObjFromFile('newTicketsQUEUE');
        payload.forEach(item => {
            common.pushticket(item); });
        localStorage.removeItem('newTicketsQUEUE');
    };
    await common.serverLoad();
    showLoadingPopup(false); // verstecken des load pop ups wenn daten geladen wurden
    common.fillDropdown('mitarbeiter', 'mitarbeiterDropdown');
});


// button -> App Starten
document.getElementById('welcome').addEventListener('click', function() {
    const userSelected = {
        'Id': document.getElementById('mitarbeiterDropdown').value
    };
    common.saveJsonObjToFile(userSelected, 'currentuser');
    document.location.href = 'home.html'
});


// Funktion zum Anzeigen oder Ausblenden eines Lade-Popups
function showLoadingPopup(show) {
    const body = document.querySelector('body');
    const loadingPopup = document.getElementById('loadingPopup');
    if (show) {
        loadingPopup.style.display = 'block'; // load popup anzeigen
        body.classList.add('popup-active'); // Klasse 'popup-active' hinzufügen
    } else {
        loadingPopup.style.display = 'none'; // Lade-Popup ausblenden
        body.classList.remove('popup-active'); // Klasse 'popup-active' entfernen
    }
}
