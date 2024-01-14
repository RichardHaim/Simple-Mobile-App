document.addEventListener("DOMContentLoaded", function() {
    const datetimeInput = document.getElementById("datetime_input");
    const submitButton = document.getElementById("submit_newTicket");

    datetimeInput.value = getCurrentDateTime();

    submitButton.addEventListener("click", function() {
        datetimeInput.value = getCurrentDateTime();
        const description = document.getElementById("description_input").value;
        const datetime = datetimeInput.value;
        const employeeId = document.getElementById("mitarbeiter_id").value;
        const problemCategoryId = document.getElementById("problem_names").value;
        const dringlichkeitId = document.getElementById("dringlichkeitid_names").value;
        const supportTeamId = document.getElementById("SupportTeamId_names").value;
        const ticketStatusId = document.getElementById("TicketStatusId_names").value;

        createNewTicket(description, datetime, employeeId, problemCategoryId, dringlichkeitId, supportTeamId, ticketStatusId);
    });

    function getCurrentDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString().padStart(2, '0');
        var day = now.getDate().toString().padStart(2, '0');
        var formattedDateTime = `${year}-${month}-${day}`;
        return formattedDateTime;
    }

    async function createNewTicket(description, datetime, employeeId, problemCategoryId, dringlichkeitId, supportTeamId, ticketStatusId) {
        try {
            const response = await fetch('http://10.0.2.2/CreateTicket', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    MitarbeiterId: employeeId,
                    ProblemKategorieId: problemCategoryId,
                    DringlichkeitId: dringlichkeitId,
                    SupportTeamId: supportTeamId,
                    StatusTicketId: ticketStatusId,
                    Beschreibung: description,
                    DatumEingabe: datetime
                }),
            });

            if (response.ok) {
                console.log('Ticket created successfully');
            } else {
                console.error('Error creating ticket:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating ticket:', error);
        }
    }
});
