import * as common from './common.js';

// check online / offline
// wenn online UND initial -> lade daten vom server + speichere in localstorage
window.addEventListener('load', async function() {
    common.showLoadingPopup(true); // anzeigen des load pop ups wenn daten laden
    await common.serverLoad();
    common.showLoadingPopup(false); // verstecken des load pop ups wenn daten geladen wurden
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


