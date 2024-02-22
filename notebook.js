let betreff = [];
let beschreibung = [];
load();

function render() {
    let content = document.getElementById('notizen');
    content.innerHTML = '';
    document.getElementById('title').value = '';
    document.getElementById('text').value = '';

    for (i = 0; i < beschreibung.length; i++) {

        let title = betreff[i];
        let text = beschreibung[i]
        notizHinzufuegen(title, text, i);
    }
    load();
}

function notizHinzufuegen(title, text, i) {
    let content = document.getElementById('notizen');

    content.innerHTML += /*html*/`
        <div class="notiz">
            <h2>${title}</h2>
            <p>${text}</p>
            <div class="papierkorb">
                <a onclick="deleteNote(${i})"><img src="img/papierkorb.png"></a>
            </div>
        </div>
        `;
        load();
        save();
}

function oeffneNote() {
    document.getElementById('title').value = '';
    document.getElementById('text').value = '';

    save();
    render();
    load();
}

function addNote() {
    let title = document.getElementById('title').value;
    let text = document.getElementById('text').value;

    if (title != 0 || text != 0) {

        betreff.push(title);
        beschreibung.push(text);
        save();
        render();
    }

    else { }
}

function deleteNote(i) {
    betreff.splice(i, 1);
    beschreibung.splice(i, 1);
    save();
    render();
}

function save() {
    let titlesAsText = JSON.stringify(betreff);
    localStorage.setItem('titles', titlesAsText);

    let textsAsText = JSON.stringify(beschreibung);
    localStorage.setItem('texts', textsAsText);
}

function load() {
    let textsAsText = localStorage.getItem('texts');
    let titlesAsText = localStorage.getItem('titles');

    if (textsAsText && titlesAsText) {
        beschreibung = JSON.parse(textsAsText);
        betreff = JSON.parse(titlesAsText);
    }
}