import * as common from './common.js';

window.onload = function () {
    const userInStorage = common.getCurrentUser();
    console.log(userInStorage);
    document.getElementById('userGreeting').innerHTML = 'Willkommen, ' + userInStorage[0].Vorname;
    pushNewTicketsWhenOnline();
};

window.addEventListener("online", pushNewTicketsWhenOnline);

document.getElementById('createTicket').addEventListener('click', function() {
    document.location.href = 'ticket_create.html'
});

document.getElementById('viewOpenTickets').addEventListener('click', function() {
    document.location.href = 'tickets_viewAllOpen.html'
});

document.getElementById('viewClosedTickets').addEventListener('click', function() {
    document.location.href = 'tickets_viewAllClosed.html'
});

async function pushNewTicketsWhenOnline() {
    const queueNotEmpty = localStorage.getItem('newTicketsQUEUE');
    const online = await common.onlinechecker();
    if ( queueNotEmpty !== null && online ) {
        const payload = common.readJsonObjFromFile('newTicketsQUEUE');
        payload.forEach(item => {
            common.pushticket(item); });
        localStorage.removeItem('newTicketsQUEUE');
        sessionStorage.removeItem('dataDownloaded');
        await common.serverLoad('tickets');
        alert('Sie sind online! Alle neuen Tickets aus dem internen Speicher wurden erfolgreich hochgeladen');
    };
};