import * as common from './common.js';

// check online / offline
// wenn online UND initial -> lade daten vom server + speichere in localstorage
window.addEventListener('load', async function() {
    // Check if data has already been downloaded in the current session
    if (!sessionStorage.getItem('dataDownloaded')) {
        const currentStatus = await common.onlinechecker();
        // Perform download only if online or it's a page refresh
        if (currentStatus || performance.navigation.type === 1) {
            await common.fullServerLoad();
            // Set the flag in session storage to indicate that data has been downloaded in this session
            sessionStorage.setItem('dataDownloaded', true);
        };

    }; fillDropdown();
});


// button -> App Starten
document.getElementById('welcome').addEventListener('click', function() {
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
        option.text = `${person.Nachname}, ${person.Vorname}`;
        dropdown.add(option);
    });
}