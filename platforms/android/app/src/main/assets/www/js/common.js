
// Definition aller Tabellen im internen Speicher
const tables = ["tickets",
                "mitarbeiter",
                "problemkategorie",
                "supportteam",
                "ticketstatus",
                "dringlichkeit",
                "newTicketsQUEUE",
                "changeTicketsQUEUE"];

export async function onlinechecker() {
    if (navigator.onLine) {
        console.log('We\'re online!');
        return true;
    } else {
        console.log('We\'re offline...');
        return false;
    }
};


// auslesen localstorage
export function readJsonObjFromFile(filename) {
    const currentFile = localStorage.getItem(filename);
    if (currentFile == null) {
        console.log(filename, "nicht gefunden");
    } else {
        console.log(filename, "im internen Speicher: ", JSON.parse(JSON.stringify(currentFile)));
        //console.log("Anzahl an Einträgen: ", Object.keys(currentFile).length);
        return (JSON.parse(currentFile));
    };
};


// speichern localstorage
export function saveJsonObjToFile(file, filename) {
    localStorage.setItem(filename, JSON.stringify(file));
    console.log(filename, 'erfolgreich gespeichert');
};


// auslesen des gesamten internen speichers
export function readAllFiles() {
        let i = 0;
        while (i < tables.length) {
            readJsonObjFromFile(tables[i]);
            i++};
        console.log('reading done');
    };


 export async function pushticket (payload) {
     try {
         const response = await fetch ('http://10.0.2.2:3000/CreateTicket', {
             method: 'POST',
             body: JSON.stringify (payload),
             headers: {'Content-Type': 'application/json'}
         });
        const result = await response;
        console.log ("Success:", result);
        //alert('Ticket gespeichert');
     } catch (error) {
         console.error ('Fehler beim Upload der Tickets:', error);
     }
 };

// Server-GET & speichern im localstorage
// wenn nichts übergeben wird -> full load
// wenn Tabellenname übergeben wird -> nur die Tabelle laden
export async function serverLoad(table) {
    // Abfrage, ob wir online sind
    console.log('haben wir speicher?', sessionStorage.getItem('dataDownloaded'));
    if (!sessionStorage.getItem('dataDownloaded')) {
        const currentStatus = await onlinechecker();
        // Perform download only on initial load
        if (currentStatus || performance.navigation.type === 1) {
            // Set the flag in session storage to indicate that data has been downloaded in this session
            sessionStorage.setItem('dataDownloaded', true);

    const server = "http://10.0.2.2:3000/";
    const calls = {
        'getTickets': 'tickets',
        'getMitarbeiter': 'mitarbeiter',
        'getProblemkategorie': 'problemkategorie',
        'getSupportteam': 'supportteam',
        'getTicketstatus': 'ticketstatus',
        'getDringlichkeit' : 'dringlichkeit'
    };
    // Aufruf für all Tabellen
    if ( table == null ) {
        for ( const [call, filename] of Object.entries(calls)) {
            try {
                const response = await fetch(server + call);
                const data = await response.json();
                console.log( filename, 'erfolgreich vom Server geholt', JSON.stringify(data));
                saveJsonObjToFile(data, filename);
                }
            catch (error) {
                console.error('Fehler beim GET von:', filename, error);
            };
        };
    }
    // Aufruf für die übergebene Tabelle
    else {
        for ( const [call, filename] of Object.entries(calls)) {
            if ( filename == table ) {
                try {
                    const response = await fetch(server + call);
                    const data = await response.json();
                    console.log( filename, 'erfolgreich vom Server geholt', JSON.stringify(data));
                    saveJsonObjToFile(data, filename);
                    }
                catch (error) {
                    console.error('Fehler beim GET von:', filename, error);
                };
            }
        };
    }
        }
        else {
        offlinePopup();
        };
    };
};

export function getCurrentUser() {
    // read currently logged in id from user
    const storedId = readJsonObjFromFile('currentuser').Id;
    // find userId in table mitarbeiter
    const mitarbeiterData = readJsonObjFromFile('mitarbeiter');
      return mitarbeiterData.filter(
          function(mitarbeiterData){ return mitarbeiterData.Id == storedId }
      );
};


export function offlinePopup() {
      var popup = document.createElement('div');
      popup.style.position = 'fixed';
      popup.style.fontSize = '2rem';
      popup.style.fontFamily = 'Verdana';
      popup.style.top = '50%';
      popup.style.left = '50%';
      popup.style.transform = 'translate(-50%, -50%)';
      popup.style.backgroundColor = 'lightblue';
      popup.style.padding = '10px';
      popup.style.border = '1px solid #ccc';
      popup.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.3)';
      popup.style.zIndex = '9999';
      popup.style.textAlign = 'center'; /* Center content */

      var message = document.createElement('p');
      message.textContent = 'Sorry, we are offline';
      popup.appendChild(message);

      var okButton = document.createElement('button');
      okButton.textContent = 'OK';
      okButton.style.marginTop = '10px';
      okButton.style.padding = '8px 16px';
      okButton.style.cursor = 'pointer';
      okButton.addEventListener('click', function() {
        document.body.removeChild(popup);
      });
      popup.appendChild(okButton);
      document.body.appendChild(popup);
}