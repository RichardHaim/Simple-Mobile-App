// start script when opening html
window.onload =  async function() {
    await loadClosedTickets();
 };
// test
async function loadClosedTickets() {
    try {
        const response = await fetch('http://10.0.2.2:3000/getClosedTickets');
        //const response = await fetch('http://localhost:3000/getClosedTickets');
        const tickets = await response.json();

        
        const ticketListDiv = document.getElementById('ticketList');
        ticketListDiv.innerHTML = '';

        tickets.forEach(ticket => {
            const ticketInfo = document.createElement('div');
            ticketInfo.classList.add('ticketInfo'); 
            ticketInfo.innerHTML = `
            <form id="ticketForm">
                <p>Support Team: ${ticket.SupportTeam}</p>
                <p>Ticket eingegeben am: ${ticket.DateAdded}</p>
                <p>Ticket geschlossen am: ${ticket.DateClosed}</p>
                <p>Beschreibung des Tickets: ${ticket.Beschreibung}</p>
                <p>Eingegeben von: ${ticket.Nachname} ${ticket.Vorname}</p>
                <p>Art des Problems: ${ticket.ProblemKat}</p>
                <p>Dringlickeit: ${ticket.Dringlichkeit}</p>
            </form>
            `;
            ticketListDiv.appendChild(ticketInfo);
        });

    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    }

}