document.getElementById('createTicket').addEventListener('click', function() {
    document.location.href = 'ticket_create.html'
});

document.getElementById('viewOpenTickets').addEventListener('click', function() {
    document.location.href = 'tickets_viewAllOpen.html'
});

document.getElementById('viewClosedTickets').addEventListener('click', function() {
    document.location.href = 'tickets_viewAllClosed.html'
});

document.getElementById('getTickets').addEventListener('click', async function() {;
    console.log('Load Tickets button clicked');
    await loadTickets();
});


async function loadTickets() {
    try {
        const response = await fetch('http://10.0.2.2:3000/getTickets');
        //const response = await fetch('http://localhost:3000/getTickets');
        const tickets = await response.json();

        console.log(response);

        const ticketListDiv = document.getElementById('ticketList');
        ticketListDiv.innerHTML = '';

        tickets.forEach(ticket => {
            const ticketInfo = document.createElement('div');
            ticketInfo.classList.add('ticketInfo');
            ticketInfo.innerHTML = `
            <form id="ticketForm">
                <p>MitarbeiterId: ${ticket.MitarbeiterId}</p>
                <p>ProblemKategorieId: ${ticket.ProblemKategorieId}</p>
                <p>DringlichkeitId: ${ticket.DringlichkeitId}</p>
                <p>SupportTeamId: ${ticket.SupportTeamId}</p>
                <p>StatusTicketId: ${ticket.StatusTicketId}</p>
                <p>Beschreibung: ${ticket.Beschreibung}</p>
                <p>DatumEingabe: ${ticket.DatumEingabe}</p>
                <p>DatumAbschluss: ${ticket.DatumAbschluss}</p>
            </form>
            `;
            ticketListDiv.appendChild(ticketInfo);
        });
    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    };
}