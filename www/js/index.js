document.getElementById('ticketForm').addEventListener('submit', function(event) {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;

    console.log('Ticket created:', title, description);

    
});