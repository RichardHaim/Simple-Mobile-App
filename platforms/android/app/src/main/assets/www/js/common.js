
// Definition aller Tabellen im internen Speicher
const tables = ["tickets",
                "mitarbeiter",
                "problemkategorie",
                "supportteam",
                "ticketstatus",
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
    };

// Server-GET & speichern im localstorage
// wenn nichts übergeben wird -> full load
// wenn Tabellenname übergeben wird -> nur die Tabelle laden
export async function serverLoad(table) {
    const server = "http://10.0.2.2:3000/";
    const calls = {
        'getTickets': 'tickets',
        'getMitarbeiter': 'mitarbeiter',
        'getProblemkategorie': 'problemkategorie',
        'getSupportteam': 'supportteam',
        'getTicketstatus': 'ticketstatus'
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