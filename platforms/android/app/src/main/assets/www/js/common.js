/* Funktionenn die verfügbar sind:

onlinechecker()
    returns true if online, false if offline

readJsonObjFromFile(filename)
    single-read only. filename mandatory

saveJsonObjToFile(file, filename)
    single-save only. file in JSON-format.

readAllFiles()
    liest alle files aus, die in const tables definiert sind

pushticket (payload)
    payload mandatory. PUSH command für alle Daten aus payload nach tickets

serverLoad(table)
    wenn keine table (= name der tabelle im localstorage): GET von allen tabellen aus tables
    wenn table übergeben, wird nur diese vom server geladen

getCurrentUser()
    übergibt den Id des aktuellen Users (per Auswahl von index)

fillDropdown(lookingfor, dropdownId)
    befüllt dropdowns automatisch. übergeben werden muss:
        lookingfor -> zu befüllende Information, laut elementMappings in der Funktion (=name der tabelle im localstorage)
        dropdownId -> Id von <select> im HTML

getCurrentDateTime()
    selbsterklärend

offlinePopup()
    selbsterklärend

sqlonlinechecker()
    true -> sqldb ist online
    false -> sqldb is offline

*/




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




export function showLoadingPopup(show) {
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


export function appendJsonObjToFile(newData, filename) {
    // Retrieve existing data from localStorage
    const existingData = localStorage.getItem(filename);

    // Parse the existing data (if it exists)
    let currentData = existingData ? JSON.parse(existingData) : [];

    // Ensure that currentData is an array
    if (!Array.isArray(currentData)) {
        // If it's not an array, handle it based on your use case.
        // For example, you might replace the existing data with an array containing both old and new data.
        currentData = [currentData];
    }

    // Append the new data to the existing data
    currentData.push(newData);

    // Save the updated data back to localStorage
    localStorage.setItem(filename, JSON.stringify(currentData));
    console.log(filename, 'erfolgreich aktualisiert');
    readJsonObjFromFile(filename);
}

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

export async function updateTicket (payload) {
    try {
        const response = await fetch ('http://10.0.2.2:3000/UpdateTicket', {
            method: 'POST',
            body: JSON.stringify (payload),
            headers: {'Content-Type': 'application/json'}
        });
        const result = await response;
        console.log("Success:", result);
    } catch (error) {
        console.error ('Fehler beim Updaten des Tickets:', error)
    }
};

export async function sqlonlinechecker() {
    try {
        const response = await fetch ('http://10.0.2.2:3000/sqlserverchecker', {
            //method: 'GET',
            method: 'HEAD'
        })
        if (response.ok) {
            return true;
        } else {
        return false;
        }
    } catch (error) {
        console.error('Fehler beim Herstellen der Datenbankverbindung', error.message);
        return false;
    }
}

/*
export async function pushticket (payload) {
    try {
        const response = await fetch ('http://10.0.2.2:3000/CreateTicket', {
            method: 'POST',
            body: JSON.stringify (payload),
            headers: {'Content-Type': 'application/json'}
        });
       const result = await response;
       console.log ("Success: " + result + 'Status: ' + response.status);
       //alert('Ticket gespeichert');
    } catch (error) {
        console.error ('Fehler beim Upload der Tickets:', error);
    }
};
*/

export async function pushticket(payload) {
    console.log(JSON.stringify(payload));
    try {
        const response = await fetch('http://10.0.2.2:3000/CreateTicket', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const result = await response.json(); // Assuming the response is JSON, adjust accordingly
            console.log('Success:', result);
            // alert('Ticket gespeichert');
        } else {
            console.error('Fehler beim Upload der Tickets. Status:', response.status);
        }
    } catch (error) {
        console.error('Fehler beim Upload der Tickets:', error);
    }
}


// Server-GET & speichern im localstorage
// wenn nichts übergeben wird -> full load
// wenn Tabellenname übergeben wird -> nur die Tabelle laden
export async function serverLoad(table) {
    // Abfrage, ob wir online sind
    console.log('haben wir speicher?', sessionStorage.getItem('dataDownloaded'));
    if (!sessionStorage.getItem('dataDownloaded')) {
        const online = await onlinechecker();
        const server = await sqlonlinechecker();
        // Perform download only on initial load
        if ((online && server) || performance.navigation.type === 1) {
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
        alert('Keine Verbindung zum Server'); //offlinePopup();
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


export function fillDropdown(lookingfor, dropdownId) {
    const elementMappings = {
        'mitarbeiter': ['Nachname', 'Vorname'],
        'problemkategorie': ['Kategorie'],
        'supportteam': ['Team'],
        'ticketstatus': ['Status'],
        'dringlichkeit': ['Kategorie']
    };

    const data = readJsonObjFromFile(lookingfor);
    const dropdown = document.getElementById(dropdownId);

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.Id;

        if (elementMappings[lookingfor]) {
            const textContent = elementMappings[lookingfor].map(prop => item[prop]).join(' ');
            option.text = textContent;
        }

        dropdown.add(option);
    });
}


export function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var formattedDateTime = `${year}-${month}-${day}`;
    return formattedDateTime;
 };

export function formatDateForCards(date) {
    // Check if date is a string or a DOM element
    var dateString = typeof date === 'string' ? date : date.textContent.trim();

    // Extract the date part using a regular expression
    var dateMatch = dateString.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/);

    // Check if a valid date match is found
    if (dateMatch) {
        // Attempt to create a Date object
        var originalDate = new Date(dateMatch[0]);

        // Check if the date is valid
        if (!isNaN(originalDate.getTime())) {
            var options = { day: 'numeric', month: 'long', year: 'numeric' };
            var formattedDate = originalDate.toLocaleDateString('de-AT', options);
            return formattedDate;
        }
    }

    console.error("Invalid date:", dateString);
    return "Invalid Date";
};


export async function pushNewTicketsWhenOnline() {
    const queueNotEmpty = localStorage.getItem('newTicketsQUEUE');
    const online = await onlinechecker();
    const server = await sqlonlinechecker();
    console.log('online: ' + online + ', server: ' + server);
    if ( queueNotEmpty !== null && online && server ) {
        const payload = readJsonObjFromFile('newTicketsQUEUE');
        await Promise.all(payload.map(async item => {
            await pushticket(item);
        }));
        localStorage.removeItem('newTicketsQUEUE');
        sessionStorage.removeItem('dataDownloaded');
        await serverLoad('tickets');
        alert('Alle neuen Tickets aus dem internen Speicher wurden erfolgreich hochgeladen');
    };
};

/*
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
      popup.style.textAlign = 'center';

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
*/