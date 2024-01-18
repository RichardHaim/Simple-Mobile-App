import * as common from './common.js';

// check online / offline
// wenn online UND initial -> lade daten vom server + speichere in localstorage
window.addEventListener('load', async function() {
    showLoadingPopup(true); // anzeigen des load pop ups wenn daten laden
    await common.serverLoad();
    showLoadingPopup(false); // verstecken des load pop ups wenn daten geladen wurden
    fillDropdown();
});


// button -> App Starten
document.getElementById('welcome').addEventListener('click', function() {
    const userSelected = {
        'Id': document.getElementById('mitarbeiterDropdown').value
    };
    common.saveJsonObjToFile(userSelected, 'currentuser');
    document.location.href = 'home.html'
});


function fillDropdown() {
    // Get data from localStorage
    const mitarbeiterData = common.readJsonObjFromFile('mitarbeiter');

    // Get the dropdown element
    const dropdown = document.getElementById('mitarbeiterDropdown');

    // Populate the dropdown with options
    mitarbeiterData.forEach(person => {
        const option = document.createElement('option');
        option.value = person.Id;
        option.text = `${person.Nachname} ${person.Vorname}`;
        dropdown.add(option);
    });
}

// Funktion zum Anzeigen oder Ausblenden eines Lade-Popups
function showLoadingPopup(show) {
    const body = document.querySelector('body');
    const loadingPopup = document.getElementById('loadingPopup');
    if (show) {
        loadingPopup.style.display = 'block'; // Lade-Popup anzeigen
        body.classList.add('popup-active'); // Klasse 'popup-active' hinzufügen
    } else {
        loadingPopup.style.display = 'none'; // Lade-Popup ausblenden
        body.classList.remove('popup-active'); // Klasse 'popup-active' entfernen
    }
}
