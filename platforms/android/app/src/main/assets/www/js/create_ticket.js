document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("datetime_input").value = getCurrentDateTime();
    document.getElementById("submit_newTicket").addEventListener("click", function() {
        document.getElementById("datetime_input").value = getCurrentDateTime();
    });

    function getCurrentDateTime() {
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1).toString().padStart(2, '0');
        var day = now.getDate().toString().padStart(2, '0');
        var hours = now.getHours().toString().padStart(2, '0');
        var minutes = now.getMinutes().toString().padStart(2, '0');
        var formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
        return formattedDateTime;
    }
});