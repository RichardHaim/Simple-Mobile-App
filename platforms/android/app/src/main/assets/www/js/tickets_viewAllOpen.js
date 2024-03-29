import * as common from './common.js';


window.addEventListener('load', async function () {
    common.showLoadingPopup(false);
    await createCards();
    // format date
    const dateElements = document.getElementsByClassName('dateElement');
    for (const dateElement of dateElements) {
        const formattedDate = common.formatDateForCards(dateElement);
        dateElement.textContent = formattedDate;
    };
});


document.getElementById("pageRefreshButton").addEventListener("click", async function (e) {
    e.preventDefault();
    const online = await common.onlinechecker();
    const server = await common.sqlonlinechecker();
    if ( online && server ) {
        common.showLoadingPopup(true);
        sessionStorage.removeItem('dataDownloaded');
        await common.serverLoad('tickets');
        window.location.reload();
    } else {
    alert('Refresh nicht möglich, Gerät ist offline oder Server nicht erreichbar');
    }
});



async function createCards() {
    try {
        //const alltickets = common.readAllFiles();
        //console.log('laden von alltickets abgeschlossen', alltickets);
        const server = await common.sqlonlinechecker();
        const online = await common.onlinechecker();


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

                    let customButton;
                    if (!server || !online) {
                        customButton =`<div class="editButton_offline" data-ticket-id=${ticket.Ticketnummer}>Keine Serververbindung</div>`;
                    } else {
                        customButton = `<button class="editButton" data-ticket-id=${ticket.Ticketnummer}>Ticket bearbeiten</button>`;
                    };

                    ticketinfo.innerHTML = `
                        <form id="ticketForm">
                            <p id="cardTicketNr">Ticket: ${ticket.Ticketnummer}</p>
                            <p>Eingegeben von: ${mitarbeiter ? `${mitarbeiter.Vorname} ${mitarbeiter.Nachname}` : 'N/A'}</p>
                            <p>Kategorie: ${problemkategorie ? problemkategorie.Kategorie : 'N/A'}</p>
                            <p>Dringlichkeit: ${dringlichkeit ? dringlichkeit.Kategorie : 'N/A'}</p>
                            <p>Team: ${supportteam ? supportteam.Team : 'N/A'}</p>
                            <p>Status: ${ticketstatus ? ticketstatus.Status : 'N/A'}</p>
                            <p>Beschreibung: ${ticket.Beschreibung}</p>
                            <p>
                                <span>Eingegeben am</span>
                                <span class="dateElement">${ticket.DatumEingabe}</span>
                            </p>`
                            + customButton;
                            + `</form>`;
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
            event.preventDefault();
            const ticketId = event.target.getAttribute('data-ticket-id');
            // Hier sollte zu "ticket_edit.html" navigiert werden
            window.location.href = 'ticket_edit.html?ticketId='+ticketId;
            console.log(`ticket_edit.html?ticketId=${ticketId}`);
        });
    });
}

