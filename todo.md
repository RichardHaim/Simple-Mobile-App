# ToDo


## `common.js`
Make sure that functions/variables used in different locations are stored here + referenced correctly.


## HTML:
Make sure to declare all `.js` files as `type=module` ->
```html
<script src="js/common.js" type="module"></script>
```

Import `common.js` in other `.js` files:
```javascript
import * as common from './common.js';
```
Make sure to add `common.` before calling a function, e.g. `common.serverLoad();`

In `common.js`: use prefix `export`, so that other `.js` Files can access the functions:
```javascript
export function saveJsonObjToFile(file, filename) {
    // code
};
```

## Mapper für id's
Currently, only the id is displayed for most fields. Open: Create a mapper, that loads the name of that id from localstorage. Example: Support Team: 1 should should Support Team: First Level. This needs to be done on all pages, where tickets are displayed in any form (currently `tickets_viewAllOpen.html`, `tickets_viewAllClosed.html`, `ticket_view.htm` (in development), `ticket_change.html` (in development), and `ticket_create.html` (for push).

## `ticket_create.html` dataload & mapping
Implement dropdown dataload from local storage + make sure, that the data pushed to the server (or, if offline, stored to the queue), is mapped correctly with the respective id's.


## `index.html` refresh popup
during start, there should be some kind of popup to show the user that the app is loading data. This mechanic should also prevent the user from clicking any buttons.


## User carry-over
Implement functionality, that the user selected at the login-page, is carried over to other pages/functions:
- `home.html`, to be displayed on top instead of "user"
- `ticket_create.html` to be automatically selected as 'Mitarbeiter' in a field, instead of a dropdown


## CSS
Add all css commands in 1 css file + change references in all html. Make sure, that there are no overlapping commands (e.g. index.css and home.css contain different styles for the logo -> this should be adressed correctly)
- Make dropdowns more pretty


## HTML
Create page for single-ticket-view for a) view tickets, and b) changing a ticket


## online-checker
Implement online-checker in various places. There is a function in `common.js` called `onlinechecker()` that returns `true` if online, and `false` if offline.<br>
Instances, where we check if the phone is online:
- startup: if offline: provide popup message that device is offline + button to ask for reload. If online: load tables from server. Also include button to say that we are ok with offline mode.
- `home.html`: create refresh-button + same logic as in startup
- When submitting a new ticket: if online: push + message that ticket is pushed + go back to `home.html`. If offline: message that ticket is stored locally & will be pushed once online + go back to `home.html`
- When changing a ticket: if online: push + message that ticket is changed + go back to `home.html`. If offline: message that changes are stored locally & will be pushed once online + go back to `home.html`
- `tickets_viewAllOpen.html`: create refresh-button + same logic as startup


## queue
In case the app is online, the following logic applies
### new tickets
Save data to file `'newTicketsQUEUE'` (same format/content as table `'tickets'`). All tables loading data from table `'tickets'` also have to load data from table `'newTicketsQUEUE'`. Make sure, that the function does not return an error if the table `'newTicketsQUEUE'` is empty.<br>
Once the app is online, all entries in `'newTicketsQUEUE'` need to be pushed to the server

### ticket changes
Save a) old state of ticket, and b) new state of ticket to `'changeTicketsQUEUE'`. Each time, the device is changing to be online (and automatically at startup): Make a check via the `ticketId`, if the old status is still the same on the server.
- if yes: push new state from `'changeTicketsQUEUE'` to server & delete entry.
- if no: Popup that informs user that there are differences + let them decide if they want to discard (delete entry from `'changeTicketsQUEUE'`), or if they want to edit. In case of edit: jump to new page -> fill in current state on server (in fields that cannot be edited) + new state from `'changeTicketsQUEUE'` (in fields that can be edited). Provide "Discard" and "Submit" button. Discard will delete the entry from `'changeTicketsQUEUE'` without push, "Submit" will post the changes to the server + delete from `'changeTicketsQUEUE'`.
This logic is applicable for all entries in `'changeTicketsQUEUE'`.
