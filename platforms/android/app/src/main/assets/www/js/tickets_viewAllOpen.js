import * as common from './common.js';

window.onload = async function () {
    await createCards();
};

async function createCards() {
    try {
        //const alltickets = common.readAllFiles();
        //console.log('laden von alltickets abgeschlossen', alltickets);

        const localtickets = common.readJsonObjFromFile('tickets');
        if (localtickets && Array.isArray(localtickets)) {
            const ticketListDiv = document.getElementById('tickets');
            ticketListDiv.innerHTML = ''; // Inhalt leeren, um doppelte Einträge zu verhindern

            const mitarbeiterList = common.readJsonObjFromFile('mitarbeiter');
            const problemkategorieList = common.readJsonObjFromFile('problemkategorie');
            const supportteamList = common.readJsonObjFromFile('supportteam');
            const ticketstatusList = common.readJsonObjFromFile('ticketstatus');
            const dringlichkeitList = common.readJsonObjFromFile('dringlichkeit');

            localtickets.forEach(ticket => {
                if (ticket.StatusTicketId == 1) {
                    const mitarbeiter = mitarbeiterList.find(item => item.Id === ticket.MitarbeiterId);
                    const problemkategorie = problemkategorieList.find(item => item.Id === ticket.ProblemKategorieId);
                    const supportteam = supportteamList.find(item => item.Id === ticket.SupportTeamId);
                    const ticketstatus = ticketstatusList.find(item => item.Id === ticket.StatusTicketId);
                    const dringlichkeit = dringlichkeitList.find(item => item.Id == ticket.DringlichkeitId);

                    const ticketinfo = document.createElement('div');
                    ticketinfo.classList.add('ticketinfo');
                    ticketinfo.innerHTML = `
                        <form id="ticketForm">
                            <p>Ticket-Nummer: ${ticket.Ticketnummer}</p>
                            <p>Support Team: ${mitarbeiter ? `${mitarbeiter.Vorname} ${mitarbeiter.Nachname}` : 'N/A'}</p>
                            <p>ProblemKategorie: ${problemkategorie ? problemkategorie.Kategorie : 'N/A'}</p>
                            <p>Dringlichkeit: ${dringlichkeit ? dringlichkeit.Kategorie : 'N/A'}</p>
                            <p>SupportTeam: ${supportteam ? supportteam.Team : 'N/A'}</p>
                            <p>StatusTicket: ${ticketstatus ? ticketstatus.Status : 'N/A'}</p>
                            <p>Beschreibung: ${ticket.Beschreibung}</p>
                            <p>DatumEingabe: ${ticket.DatumEingabe}</p>
                            <p>DatumAbschluss: ${ticket.DatumAbschluss}</p>
                            <button class="editButton" data-ticket-id=${ticket.Ticketnummer}>Ticket bearbeiten</button>
                        </form>
                    `;
                    ticketListDiv.appendChild(ticketinfo);
                }
            });

            // Event-Listener für "editButton" nach dem Laden der Seite
            //attachEditButtonEventListeners();
            EditButtonEventListeners();
        }
    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    }
}

function EditButtonEventListeners() {
    const editButtons = document.querySelectorAll('.editButton');
    editButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const ticketId = event.target.getAttribute('data-ticket-id');
            console.log('Ticketnummer angeklickt =', ticketId);
            // Hier sollte zu "ticket_edit.html" navigiert werden
            //window.location.href = "ticket_edit.html?ticketId=${ticketId}";
            window.location.href = "ticket_edit.html";
        });
    });
}

