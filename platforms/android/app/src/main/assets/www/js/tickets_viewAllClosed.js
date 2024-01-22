import * as common from './common.js';


window.addEventListener('load', async function () {
    common.showLoadingPopup(false);
    await createCards();
    // format date
    const dateElements = document.getElementsByClassName('dateElement');
    for (const dateElement of dateElements) {
        const formattedDate = common.formatDateForCards(dateElement);
        dateElement.textContent = formattedDate;
    }
});


document.getElementById("pageRefreshButton").addEventListener("click", async function (e) {
    e.preventDefault();
    const online = await common.onlinechecker();
    if ( online ) {
        common.showLoadingPopup(true);
        sessionStorage.removeItem('dataDownloaded');
        await common.serverLoad('tickets');
        window.location.reload();
    } else {
    alert('Refresh nicht möglich, Gerät ist offline');
    }
});


async function createCards() {
    try {
        //const alltickets = common.readAllFiles();
        //console.log(alltickets)

        const localtickets = common.readJsonObjFromFile('tickets');
        if (localtickets && Array.isArray(localtickets)) {
            const ticketListDiv = document.getElementById('tickets');


            const mitarbeiterList = common.readJsonObjFromFile('mitarbeiter');
            const problemkategorieList = common.readJsonObjFromFile('problemkategorie');
            const supportteamList = common.readJsonObjFromFile('supportteam');
            const ticketstatusList = common.readJsonObjFromFile('ticketstatus');
            const dringlichkeitList = common.readJsonObjFromFile('dringlichkeit');

            localtickets.forEach(ticket => {
                if (ticket.StatusTicketId == 2) {

                    const mitarbeiter = mitarbeiterList.find(item => item.Id === ticket.MitarbeiterId);
                    const problemkategorie = problemkategorieList.find(item => item.Id === ticket.ProblemKategorieId);
                    const supportteam = supportteamList.find(item => item.Id === ticket.SupportTeamId);
                    const ticketstatus = ticketstatusList.find(item => item.Id === ticket.StatusTicketId);
                    const dringlichkeit = dringlichkeitList.find(item => item.Id == ticket.DringlichkeitId);

                    const ticketinfo = document.createElement('div');
                    ticketinfo.classList.add('ticketinfo');
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
                            </p>
                            <p>
                                <span>Geschlossen am</span>
                                <span class="dateElement">${ticket.DatumAbschluss}</span>
                            </p>
                        </form>
                    `;
                    ticketListDiv.appendChild(ticketinfo);
                }
            });
        }
    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    }
}
