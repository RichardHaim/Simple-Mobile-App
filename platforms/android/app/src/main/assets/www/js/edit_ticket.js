import * as common from './common.js';

window.onload = async function () {
    const ticketId = getTicketIdFromUrl(); // Funktion um  Ticket-ID aus der URL zu extrahieren
    if (ticketId) {
        await loadTicketData(ticketId);
    } else {
        alert('Ticket-ID wurde nicht gefunden.');
    }
};

async function loadTicketData(ticketId) {
    try {
        const ticketData = await common.readJsonObjFromFile('tickets');
        const ticket = ticketData.find(item => item.Id === ticketId);

        if (ticket) {
            // formularfelder mit  Ticketdaten fuellen
            document.getElementById('description').value = ticket.Beschreibung;
            // einfach ein element vorerst zum testen

            // Event-Listener für  Formular
            document.getElementById('editTicketForm').addEventListener('submit', function (event) {
                event.preventDefault();

                alert('Änderungen gespeichert!');
            });
        } else {
            alert('Ticket wurde nicht gefunden.');
        }
    } catch (error) {
        console.error('Fehler beim Laden der Ticketdaten:', error);
    }
}