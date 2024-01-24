import * as common from './common.js';

window.onload = async function () {
    const userInStorage = common.getCurrentUser();
    console.log(userInStorage);
    document.getElementById('userGreeting').innerHTML = 'Willkommen, ' + userInStorage[0].Vorname;
    common.pushNewTicketsWhenOnline();
};

document.addEventListener('DOMContentLoaded', function () {
    // Function to update online status
    function updateOnlineStatus() {
        var onlineStatusElement = document.getElementById('onlineStatus');

        if (navigator.onLine) {
            onlineStatusElement.textContent = 'Ihr Gerät ist Online';
            onlineStatusElement.classList.remove('offline'); // Remove the 'offline' class
        } else {
            onlineStatusElement.textContent = 'Ihr Gerät ist Offline';
            onlineStatusElement.classList.add('offline'); // Add the 'offline' class
        }
    }
    // Initial check and setup event listener for online/offline changes
    updateOnlineStatus();
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
});


window.addEventListener("online", common.pushNewTicketsWhenOnline);

document.getElementById('createTicket').addEventListener('click', function() {
    document.location.href = 'ticket_create.html'
});

document.getElementById('viewOpenTickets').addEventListener('click', function() {
    document.location.href = 'tickets_viewAllOpen.html'
});

document.getElementById('viewClosedTickets').addEventListener('click', function() {
    document.location.href = 'tickets_viewAllClosed.html'
});