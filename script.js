let titles = []; // Array für Titel
let notes = []; // Array für Notizen

let trashTitles= []; //Array für Titel im Papierkorb
let trashNotes= []; //Array für Notizen im Papierkorb

loadNote();

//Notizen erstellen
function renderNotes() { 
    loadNote();
    let content = document.getElementById('content');
    content.innerHTML = ``;

    loadRenderHtmlNotes();
}

function loadRenderHtmlNotes(){
    for(let i = 0; i < titles.length || i < notes.length; i++) {
        const title = titles [i]; 
        const note = notes [i];

        content.innerHTML += `
            <div class="notes">
            <b><p> ${title}</p> </b>
            <b><p> ${note}</p> </b>
                <div class="noteButton">
                    <img class="noteAdd" src="./img/recycleBin.png" alt="" onclick="deleteNote(${i})">
                </div>
            <div
            `;
   }
}

// Notizen im Papierkorb erstellen
function renderRecycleBin() { 
    loadNote();
    let contentTrash = document.getElementById('contentTrash');
    contentTrash.innerHTML = ``;

    loadRenderRecycleBinHtml();
}

function loadRenderRecycleBinHtml(){

    for(let i = 0; i < trashTitles.length || i < trashNotes.length; i++) {
        const trashTitle = trashTitles [i]; 
        const trashNote = trashNotes [i];

        contentTrash.innerHTML += `
            <div class="notes">
            <b><p> ${trashTitle}</p> </b>
            <b><p> ${trashNote}</p> </b>
            
                <div class="noteButton">
                    <img class="noteAdd" src="./img/restoration.png" alt="" onclick="restoreNote(${i})">
                    <img class="noteAdd" src="./img/recycleBin.png" alt="" onclick="deleteCompletlyNote(${i})">
                </div>
            <div
            `;
    }
}

// Notiz hinzufügen
function addNote(){ 
    let title = document.getElementById('title');
    let note = document.getElementById('note');

    if(title.value == ''){
        alert ('Fügen Sie einen Betreff ein')
        return
    }else if(note.value == '') {
        alert ('Fügen Sie eine neue Notiz hinzu')
        return
    } else {
        titles.push(title.value);
        notes.push(note.value);
    }

    document.getElementById('title').value = ``;
    document.getElementById('note').value = ``;

    saveNote();
    renderNotes();   
}

// Alle Notizen löschen
function deleteAllNote(i) { 
    for(i = 0; i < titles.length || i < notes.length;){
    trashTitles.push(titles);
    trashNotes.push(notes);

    titles.splice(i);
    notes.splice(i);
    }

    saveNote();
    renderNotes();
}

// Einzelne Notizen löschen
function deleteNote(i) {
    trashTitles.push(titles [i]);
    trashNotes.push(notes [i]);

    titles.splice (i, 1);
    notes.splice (i, 1);

    saveNote();
    renderNotes();
}

// Notizen wiederherstellen aus dem Papierkorb
function restoreNote(i){ 
    titles.push(trashTitles [i]);
    notes.push(trashTitles [i]);

    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);

    saveNote();
    renderRecycleBin();
}

// Notizen endgültig löschen
function deleteCompletlyNote(i){ 
    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);

    saveNote();
    renderRecycleBin();
}

// Notiz Umwandeln in einen Text und in den localStorage einspeichern
function saveNote(){ 
    let titleAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titleAsText);

    let notesAsText = JSON.stringify(notes);
    localStorage.setItem('notes', notesAsText);

    let trashTitlesAsText = JSON.stringify(trashTitles);
    localStorage.setItem('trashTitles', trashTitlesAsText);

    let trashNotesAsText = JSON.stringify(trashNotes);
    localStorage.setItem('trashNotes', trashNotesAsText);
}

// Notiz abrufen und wieder in ein Array umwandeln
function loadNote () { 
    let titleAsText = localStorage.getItem ('titles'); 
    let notesAsText = localStorage.getItem ('notes');
    if (titleAsText && notesAsText) {
        titles = JSON.parse (titleAsText);
        notes = JSON.parse (notesAsText);
    }

    let archivTitlesAsText = localStorage.getItem ('archivTitles'); 
    let archivNotesAsText = localStorage.getItem ('archivNotes');
    if (archivTitlesAsText && archivNotesAsText) {
        archivTitles = JSON.parse (archivTitlesAsText);
        archivNotes = JSON.parse (archivNotesAsText);
    }

    let trashTitlesAsText = localStorage.getItem ('trashTitles'); 
    let trashNotesAsText = localStorage.getItem ('trashNotes');
    if (trashTitlesAsText && trashNotesAsText) {
        trashTitles = JSON.parse (trashTitlesAsText);
        trashNotes = JSON.parse (trashNotesAsText);
    }
}