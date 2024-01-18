import * as common from './common.js';

window.onload = async function () {
    await createCards();
};

// reading tickets from localstorage
async function createCards() {
    try {
        const localtickets = common.readJsonObjFromFile('tickets');
        if (localtickets && Array.isArray(localtickets)) {
            const ticketListDiv = document.getElementById('tickets');

            localtickets.forEach(ticket => {
                if ( ticket.StatusTicketId == 1) {
                    const ticketinfo = document.createElement('div');
                    ticketinfo.classList.add('ticketinfo');
                    ticketinfo.innerHTML = `
                        <form id="ticketForm">
                            <p>Support Team: ${ticket.MitarbeiterId}</p>
                            <p>ProblemKategorie Id ${ticket.ProblemKategorieId}</p>
                            <p>Dringlichkeit Id: ${ticket.DringlichkeitId}</p>
                            <p>SupportTeamId: ${ticket.SupportTeamId}</p>
                            <p>StatusTicket: ${ticket.StatusTicketId}</p>
                            <p>Beschreibung: ${ticket.Beschreibung}</p>
                            <p>DatumEingabe: ${ticket.DatumEingabe}</p>
                            <p>DatumAbschluss: ${ticket.DatumAbschluss}</p>
                        </form>
                    `;
                    ticketListDiv.appendChild(ticketinfo);
                };
            });
        };
    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    }
}
