import * as common from './common.js';

window.onload = function () {
    const userInStorage = greetMe();
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

function greetMe () {
    // read currently logged in id from user
    const storedId = common.readJsonObjFromFile('currentuser').Id;
    // find userId in table mitarbeiter
    const mitarbeiterData = common.readJsonObjFromFile('mitarbeiter');
      return mitarbeiterData.filter(
          function(mitarbeiterData){ return mitarbeiterData.Id == storedId }
      );

}