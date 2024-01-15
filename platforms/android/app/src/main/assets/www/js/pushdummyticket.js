// start script when opening html
window.onload =  async function() {
    const payload = {
        'MitarbeiterId': 1,
        'ProblemKategorieId': 1,
        'DringlichkeitId': 1,
        'SupportTeamId': 1,
        'StatusTicketId': 1,
        'Beschreibung': 'dummyticket',
        'DatumEingabe': '2024-01-15'
    };
    await pushticket(payload);
 };

async function pushticket(payload) {
    try {
        const response = await fetch('http://10.0.2.2:3000/CreateTicket', {
            method: 'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
        });

    } catch (error) {
        console.error('Fehler beim Laden der Tickets:', error);
    }

}