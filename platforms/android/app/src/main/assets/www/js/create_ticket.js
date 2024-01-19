import * as common from './common.js';

window.onload = function () {
    datetime_input.value = getCurrentDateTime();
};

window.addEventListener("DOMContentLoaded", (event) => {
    document.getElementById("submit_newTicket").addEventListener("click", async function() {
        const payload = getFieldInput();
        await common.pushticket(payload);
        await common.serverLoad('tickets');
        document.location.href = 'home.html';
        //console.log(JSON.stringify(payload));
    });
});

function getFieldInput () {
    const payload = {
        'MitarbeiterId': document.getElementById("mitarbeiter_id").value,
        'ProblemKategorieId': document.getElementById("problem_names").value,
        'DringlichkeitId': document.getElementById("dringlichkeitid_names").value,
        'SupportTeamId': document.getElementById("SupportTeamId_names").value,
        'StatusTicketId': 1, //document.getElementById("TicketStatusId_names").value,
        'Beschreibung': document.getElementById("description_input").value,
        'DatumEingabe': document.getElementById("datetime_input").value
        };
    return payload;
};

function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var formattedDateTime = `${year}-${month}-${day}`;
    return formattedDateTime;
 };

/*
 async function pushticket (payload) {
     try {
         const response = await fetch ('http://10.0.2.2:3000/CreateTicket', {
             method: 'POST',
             body: JSON.stringify (payload),
             headers: {'Content-Type': 'application/json'}
         });
        const result = await response;
        console.log ("Success:", result);
     } catch (error) {
         console.error ('Fehler beim Upload der Tickets:', error);
     }
 };
 */