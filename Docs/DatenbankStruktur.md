# Struktur der Server-Datenbank (mySQL)

## ER-Modell

<img src="ER-Modell.drawio.png"
     alt="ER-Modell"/>

## Datentypen

### Tickets
| Relation             | Typ |
| -----------------    | ----|
| Mitarbeiter.Id       | INT |
| ProblemKategorie.Id  | INT |
| Dringlichkeit.Id     | INT |
| SupportTeam.Id       | INT |
| StatusTicket.Id      | INT |
| Beschreibung         | STR |
| DatumEingabe         | DAT |
| DatumAbschluss       | DAT |

### ProblemKategorie
| Relation             | Typ |
| -----------------    | ----|
| Id                   | INT |
| Kategorie            | STR |

### Dringlichkeit
| Relation             | Typ |
| -----------------    | ----|
| Id                   | INT |
| Kategorie            | STR |

### TicketStatus
| Relation             | Typ |
| -----------------    | ----|
| Id                   | INT |
| Status               | STR |

### Mitarbeiter
| Relation             | Typ |
| -----------------    | ----|
| Id                   | INT |
| Vorname              | STR |
| Nachname             | STR |
| SupportTeam.id       | INT |

### Support-Team
| Relation             | Typ |
| -----------------    | ----|
| Id                   | INT |
| Team                 | STR |
