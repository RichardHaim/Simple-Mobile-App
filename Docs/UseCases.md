# Beschreibung/Auflistung der Use-Cases

* Login landing page
  - User melden sich durch Auswahl ihres Users an.
  - Der Name des Users muss für weitere Funktionalitäten gespeichert sein
  - Unterscheidung zwischen Support-Team und reguläre*r Mitarbeiter*in

* Eingabe neues Ticket
  - Name des Users (automatisch)
  - Datum (automatisch)
  - Problem-Kategorie
  - Auswahl des Support-Teams (dropdown/Liste)
  - Auswahl der Dringlichkeit (checkbox mit mehreren Optionen - siehe Auflistung im nächsten Kapitel)
  - Eingabe des Problems als freier Text mit maximal 256 Zeichen

* Liste offener Tickets aufrufen. Mit Klick auf das jeweilige Ticket wird dieses aufgerufen. Alle Felder sind ausgegraut, aber durch einen Änderungs-Button (e.g. Stift) können Einträge geändert werden.
* Liste geschlossener Tickets aufrufen. Mit Klick auf das jeweilige Ticket wird dieses aufgerufen. Alle Felder sind ausgegraut, Änderungen sind nicht mehr möglich.
* Tickets bearbeiten (nur offene Tickets). Geändert werden können:
  - Problem-Kategorie
  - Auswahl des Support-Teams
  - Auswahl der Dringlichkeit
  - Freier Text (beschränkt auf Person, die das Ticket eingegeben hat, Support kann Text nicht ändern)
  
* Tickets abschließen
  - Nur Support-Team
  - Tickets können durch eigenen Button geschlossen werden
  - Übertragung des Datums der Schließung an den Server

* Konflikt: 2 oder mehrere User bearbeiten das gleiche Ticket. Nur ein User ist online, die Änderung wird sofort gepushed. Später kommen die anderen User online, die App will die Änderungen zum gleichen Ticket pushen, entdeckt jedoch, dass bereits Änderungen vorgenommen wurden --> _Beschreibung, wie die App das Problem entdeckt & löst_


## Optionen für die Dringlichkeit des Tickets
Kategorie 1) nicht dringend, keine Unterbrechung der Arbeit
Kategorie 2) mäßig dringend, Arbeit kann erledigt werden, jedoch mit Unterbrechungen
Kategorie 3) dringend, Arbeit kann nur erschwert erledigt werden
Kategorie 4) sehr dringend, Arbeit kann _nicht_ erledigt werden
