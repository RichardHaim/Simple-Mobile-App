import * as common from './common.js';

window.onload = function () {
    const userInStorage = common.getCurrentUser();
    console.log(userInStorage);
    document.getElementById('userGreeting').innerHTML = 'Willkommen, ' + userInStorage[0].Vorname;
};


document.getElementById('createTicket').addEventListener('click', function() {
    document.location.href = 'ticket_create.html'
});

document.getElementById('viewOpenTickets').addEventListener('click', function() {
    document.location.href = 'tickets_viewAllOpen.html'
});

document.getElementById('viewClosedTickets').addEventListener('click', function() {
    document.location.href = 'tickets_viewAllClosed.html'
});