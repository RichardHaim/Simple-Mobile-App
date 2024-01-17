    // auslesen localstorage
export function readJsonObjFromFile(filename) {
    const checker = localStorage.getItem(filename);
    console.log(filename, "im internen Speicher: ", JSON.parse(JSON.stringify(checker)));
    console.log("Anzahl an Einträgen: ", Object.keys(checker).length);
};

    // speichern localstorage
export function saveJsonObjToFile(file, filename) {
    localStorage.setItem(filename, JSON.stringify(file));
    console.log('Daten erfolgreich gespeichert');
};

export function readAllFiles() {
    const tables = ["tickets", "mitarbeiter", "problemkategorie", "supportteam", "ticketstatus"];
        let i = 0;
        while (i < tables.length) {
            readJsonObjFromFile(tables[i]);
            i++};
    };