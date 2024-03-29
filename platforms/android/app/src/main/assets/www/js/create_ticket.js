import * as common from './common.js';

window.onload = function () {
    //datetime_input.value = common.getCurrentDateTime();
    fillUpDropdowns();
};

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("submit_newTicket").addEventListener("click", async function() {
        const payload = getFieldInput();
        // if online: push to server, if offline: store in newTicketsQUEUE and push if online again
        const online = await common.onlinechecker();
        const server = await common.sqlonlinechecker();
        console.log(online);
        if ( online && server ) {
            sessionStorage.removeItem('dataDownloaded');
            await common.pushticket(payload);
            await common.serverLoad('tickets');
            alert('Neues Ticket erfolgreich hochgeladen');
        } else {
            common.appendJsonObjToFile(payload, 'newTicketsQUEUE');
            alert('Sie sind offline/der Server ist nicht erreichbar, Ihr Ticket wird hochgeladen, sobald Sie wieder online sind.');
        };
        document.location.href = 'home.html';
    });
});

function getFieldInput () {
    const currentUser = common.getCurrentUser()[0].Id;
    console.log(currentUser);
    const payload = {
        'MitarbeiterId': currentUser,
        'ProblemKategorieId': document.getElementById("problem_names").value,
        'DringlichkeitId': document.getElementById("dringlichkeitid_names").value,
        'SupportTeamId': document.getElementById("SupportTeamId_names").value,
        'StatusTicketId': 1, //document.getElementById("TicketStatusId_names").value,
        'Beschreibung': document.getElementById("description_input").value,
        'DatumEingabe': common.getCurrentDateTime() //document.getElementById("datetime_input").value
        };
    return payload;
};

function fillUpDropdowns () {
    common.fillDropdown('problemkategorie', 'problem_names');
    common.fillDropdown('dringlichkeit', 'dringlichkeitid_names');
    common.fillDropdown('supportteam', 'SupportTeamId_names');
}