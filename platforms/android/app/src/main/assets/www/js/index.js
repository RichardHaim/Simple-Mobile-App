document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;

    console.log('Ticket created:', title, description);

    // Add code here to store the ticket data in a suitable data structure
    // and perform any additional actions such as updating the UI or communicating with a backend server.
});