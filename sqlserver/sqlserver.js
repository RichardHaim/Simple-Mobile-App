const sql = require('mssql');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const config = {
  user: 'pfeilerd',
  password: 'Admin123',
  server: 'sqlticket.database.windows.net',
  port: 1433,
  database: 'sqlTicket',
  options: {
    encrypt: true, // Für Azure SQL erforderlich
  }
}
app.get('/', (req, res) => {
    res.send('Server läuft erfolgreich!');
  });

app.get('/getTickets', async (req, res) => {
    try {
      // Verbindung zum SQL Server herstellen
      const poolConnection = await sql.connect(config);
      console.log('Anfrage zum Abrufen der Tickets erhalten');
      // SQL Query ausführen, um alle Einträge aus der Tabelle abzurufen
      const resultSet = await poolConnection.request().query('SELECT * FROM [dbo].[Tickets]');
      console.log('Tickets erfolgreich zurückgegeben');
      // Tickets als JSON zurücksenden
      res.json(resultSet.recordset);
  
      // Verbindung schließen, wenn die Anwendung abgeschlossen ist
      await sql.close();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Interner Serverfehler');
    }
  });
  
  // ...
  
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });


