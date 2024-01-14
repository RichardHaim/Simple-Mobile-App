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

      const resultSet = await poolConnection.request().query(
        'SELECT * FROM [dbo].[Tickets]'        
        );

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


  app.get('/getClosedTickets', async (req, res) => {
    try {
      // Verbindung zum SQL Server herstellen
      const poolConnection = await sql.connect(config);
      console.log('Anfrage zum Abrufen der Tickets erhalten');

      const resultSet = await poolConnection.request().query(
        `SELECT
            st.Team as 'SupportTeam',
            t.DatumEingabe as 'DateAdded',
            t.DatumAbschluss as 'DateClosed',
            t.Beschreibung,
            ma.Nachname,
            ma.Vorname,
            pk.Kategorie as 'ProblemKat',
            d.Kategorie as 'Dringlichkeit'
        FROM dbo.Tickets t
        JOIN dbo.TicketStatus AS ts ON t.StatusTicketId = ts.Id  
        JOIN dbo.ProblemKategorie AS pk ON t.ProblemKategorieId = pk.Id 
        JOIN dbo.Dringlichkeit AS d ON t.DringlichkeitId = d.Id 
        JOIN dbo.SupportTeam AS st ON t.SupportTeamId = st.Id
        JOIN dbo.Mitarbeiter AS ma ON t.MitarbeiterId = ma.Id 
        WHERE ts.Id = 2
        ORDER BY t.DatumEingabe ASC`
      );

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

  app.post('/CreateTicket', async (req, res) => {
    try {
        const poolConnection = await sql.connect(config);

        
        const {
            MitarbeiterId,
            ProblemKategorieId,
            DringlichkeitId,
            SupportTeamId,
            StatusTicketId,
            Beschreibung,
            DatumEingabe
        } = req.body;

        
        if (!MitarbeiterId || !ProblemKategorieId || !DringlichkeitId || !SupportTeamId || !StatusTicketId || !Beschreibung || !DatumEingabe) {
            return res.status(400).send('All fields are required');
        }

       
        const result = await poolConnection.request().query(`
        INSERT INTO [dbo].[Tickets] (MitarbeiterId, ProblemKategorieId, DringlichkeitId, SupportTeamId, StatusTicketId, Beschreibung, DatumEingabe)
        VALUES (${MitarbeiterId}, ${ProblemKategorieId}, ${DringlichkeitId}, ${SupportTeamId}, ${StatusTicketId}, '${Beschreibung}', CONVERT(datetime, '${DatumEingabe}', 126))
        `);

        console.log('Ticket successfully created');
        res.status(201).send('Ticket successfully created');

        
        await sql.close();
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});
  
  app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
  });


