window.onload = function () {
    datetime_input.value = getCurrentDateTime();
};

window.addEventListener("DOMContentLoaded", (event) => {
document.getElementById("submit_newTicket").addEventListener("click", async function() {
    payload = getFieldInput();
    await pushticket(payload);
    console.log(JSON.stringify(payload));
});
});

function getFieldInput () {
      const description = document.getElementById("description_input").value;
      const datetime = document.getElementById("datetime_input").value;
      const employeeId = document.getElementById("mitarbeiter_id").value;
      const problemCategoryId = document.getElementById("problem_names").value;
      const dringlichkeitId = document.getElementById("dringlichkeitid_names").value;
      const supportTeamId = document.getElementById("SupportTeamId_names").value;
      const ticketStatusId = document.getElementById("TicketStatusId_names").value;
      const payload = {
          'MitarbeiterId': employeeId,
          'ProblemKategorieId': problemCategoryId,
          'DringlichkeitId': dringlichkeitId,
          'SupportTeamId': supportTeamId,
          'StatusTicketId': ticketStatusId,
          'Beschreibung': description,
          'DatumEingabe': datetime
          };
    return payload;
}


function getCurrentDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = (now.getMonth() + 1).toString().padStart(2, '0');
    var day = now.getDate().toString().padStart(2, '0');
    var formattedDateTime = `${year}-${month}-${day}`;
    return formattedDateTime;
 }

 async function pushticket(payload) {
     try {
         const response = await fetch('http://10.0.2.2:3000/CreateTicket', {
             method: 'POST',
             body: JSON.stringify(payload),
             headers: {'Content-Type': 'application/json'}
         });
        const result = await response;
        console.log(result);
        console.log("Success:", result);
     } catch (error) {
         console.error('Fehler beim Laden der Tickets:', error);
     }
 }