import * as common from './common.js';

addEventListener ( 'load', async function () {
    console.log('onload für ticketdetails gestartet');
    const ticketId = getTicketIdFromUrl(); // Funktion um  Ticket-ID aus der URL zu extrahieren
    if (ticketId) {
        await loadTicketData(ticketId);
    } else {
        alert('Ticket-ID wurde nicht gefunden.');
    }
});
/*
window.onload = async function () {
    console.log('onload für ticketdetails gestartet');
    const ticketId = getTicketIdFromUrl(); // Funktion um  Ticket-ID aus der URL zu extrahieren
    if (ticketId) {
        await loadTicketData(ticketId);
    } else {
        alert('Ticket-ID wurde nicht gefunden.');
    }
};
*/
async function loadTicketData(ticketId) {
    try {
        const ticketData = await common.readJsonObjFromFile('tickets');
        const ticket = ticketData.find(item => item.Ticketnummer === Number(ticketId));
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

function getTicketIdFromUrl () {
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
        if ( key == "ticketId" ) { return value };
    };

}