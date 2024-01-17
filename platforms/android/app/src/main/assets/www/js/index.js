import * as common from './common.js';

// check online / offline
// wenn online -> lade daten vom server + speichere in localstorage

window.addEventListener('load', async function() {
    const currentStatus = await common.onlinechecker();
    if (currentStatus) {
        await common.fullServerLoad();
        }
});


// button -> App Starten
document.getElementById('welcome').addEventListener('click', function() {
    document.location.href = 'home.html'
});