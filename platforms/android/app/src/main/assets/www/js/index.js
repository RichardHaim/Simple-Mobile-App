import * as common from './common.js';

// check online / offline
// wenn online UND initial -> lade daten vom server + speichere in localstorage
window.addEventListener('load', async function() {
    await common.serverLoad();
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