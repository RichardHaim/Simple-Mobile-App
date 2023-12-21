document.getElementById('ticketForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;

    console.log('Ticket created:', title, description);

    await loadTickets();
});

document.getElementById('welcome').addEventListener('click', function() {
    document.location.href = 'home.html'
});

document.getElementById('getTickets').addEventListener('click', async function() {
    console.log('Load Tickets button clicked');
    await loadTickets();
});


async function loadTickets() {
    try {
        const response = await fetch('http://localhost:3000/getTickets');
        const tickets = await response.json();

        
        const ticketListDiv = document.getElementById('ticketList');
        ticketListDiv.innerHTML = '';

        tickets.forEach(ticket => {
            const ticketInfo = document.createElement('div');
            ticketInfo.classList.add('ticketInfo'); 
            ticketInfo.innerHTML = `
                <p>MitarbeiterId: ${ticket.MitarbeiterId}</p>
                <p>ProblemKategorieId: ${ticket.ProblemKategorieId}</p>
                <p>DringlichkeitId: ${ticket.DringlichkeitId}</p>
                <p>SupportTeamId: ${ticket.SupportTeamId}</p>
                <p>StatusTicketId: ${ticket.StatusTicketId}</p>
                <p>Beschreibung: ${ticket.Beschreibung}</p>
                <p>DatumEingabe: ${ticket.DatumEingabe}</p>
                <p>DatumAbschluss: ${ticket.DatumAbschluss}</p>
                <hr>
            `;
            ticketListDiv.appendChild(ticketInfo);
        });

    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    }
}
