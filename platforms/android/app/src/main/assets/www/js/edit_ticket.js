import * as common from './common.js';

addEventListener('load', async function () {
    fillUpDropdowns();
    console.log('onload für ticketdetails gestartet');
    const ticketId = getTicketIdFromUrl(); // Funktion um  Ticket-ID aus der URL zu extrahieren
    if (ticketId) {
        await loadTicketData(ticketId);
    } else {
        alert('Ticket-ID wurde nicht gefunden.');
    }
});

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("submit_updatedTicket").addEventListener("click", async function () {
        const payload = getFieldInput();
        console.log(JSON.stringify(payload));
        await common.updateTicket(payload);
        sessionStorage.clear('dataDownloaded');
        await common.serverLoad('tickets');
        document.location.href = 'home.html';
        alert('Änderungen gespeichert!');
    });
});

function getFieldInput() {
    const ticketId = getTicketIdFromUrl();
    // if ticketstatus changes from offen to geschlossen: push today as DatumAbschluss
    let payload = {
        'Ticketnummer': ticketId,
        'MitarbeiterId': document.getElementById("mitarbeiter_id").value,
        'ProblemKategorieId': document.getElementById("problem_names").value,
        'DringlichkeitId': document.getElementById("dringlichkeitid_names").value,
        'SupportTeamId': document.getElementById("SupportTeamId_names").value,
        'StatusTicketId': document.getElementById("TicketStatusId_names").value,
        'Beschreibung': document.getElementById("description_input").value
        };
    if ( document.getElementById('TicketStatusId_names').value == 2 ) {
        payload = Object.assign (payload, {'DatumAbschluss' : common.getCurrentDateTime()});
    } else {
        payload = Object.assign (payload, {'DatumAbschluss' : ''});
    }
    return payload;
}

async function loadTicketData(ticketId) {
    try {
        const ticketData = await common.readJsonObjFromFile('tickets');
        const ticket = ticketData.find(item => item.Ticketnummer === Number(ticketId));
        if (ticket) {
            document.getElementById('TicketStatusId_names').value = ticket.StatusTicketId;
            document.getElementById('SupportTeamId_names').value = ticket.SupportTeamId;
            document.getElementById('dringlichkeitid_names').value = ticket.DringlichkeitId;
            document.getElementById('description_input').value = ticket.Beschreibung;
            document.getElementById('problem_names').value = ticket.ProblemKategorieId;
            document.getElementById('mitarbeiter_id').value = ticket.MitarbeiterId;
        } else {
            alert('Ticket wurde nicht gefunden.');
        }
    } catch (error) {
        console.error('Fehler beim Laden der Ticketdaten:', error);
    }
}

function getTicketIdFromUrl() {
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams) {
        if (key == "ticketId") { return value; }
    }
}

function fillUpDropdowns () {
    common.fillDropdown('mitarbeiter', 'mitarbeiter_id')
    common.fillDropdown('problemkategorie', 'problem_names');
    common.fillDropdown('dringlichkeit', 'dringlichkeitid_names');
    common.fillDropdown('supportteam', 'SupportTeamId_names');
    common.fillDropdown('ticketstatus','TicketStatusId_names');
}