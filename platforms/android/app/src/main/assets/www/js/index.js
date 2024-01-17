import * as common from './common.js';

// check online / offline
// wenn online -> lade daten vom server + speichere in localstorage
window.addEventListener('load', async function(e) {
    common.readAllFiles();
    if (navigator.onLine) {
        console.log('We\'re online!');
        await common.fullServerLoad();
    } else {
        console.log('We\'re offline...');
    }
}, false);

// button -> App Starten
document.getElementById('welcome').addEventListener('click', function() {
    document.location.href = 'home.html'
});