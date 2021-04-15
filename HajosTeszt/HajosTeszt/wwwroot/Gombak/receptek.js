var receptek;
var sorszám = 0;

function varganya() {
    fetch('/gombak/varganya.json')
        .then(r => r.json())
        .then(d => letöltésbefejeződött(d));
}

function kucsma() {
    fetch('/gombak/kucsma.json')
        .then(r => r.json())
        .then(d => letöltésbefejeződött(d));
}

function roka() {
    fetch('/gombak/roka.json')
        .then(r => r.json())
        .then(d => letöltésbefejeződött(d));
}

function összes() {
    varganya();
    roka();
    kucsma();
}

function törlés() {
    let menu = document.getElementById('article');
    menu.innerHTML = '';
}

function letöltésbefejeződött(data) {
    receptek = data;
    console.log(3);
    receptMegjelenítés(receptek);
}

function receptMegjelenítés(receptek) {
    let hova = document.getElementById('article');
    for (var i = 0; i < receptek.length; i++) {

        let recept = document.createElement('div');
        recept.classList.add('recept');
        hova.appendChild(recept)

        let link = document.createElement('a');
        link.classList.add('row');
        link.href = receptek[i].link;
        link.target = '_blank'
        recept.appendChild(link);

        let kep = document.createElement('img');
        kep.classList.add('col-3');
        kep.classList.add('col-t-3')
        kep.src = receptek[i].kep;
        kep.alt = receptek[i].nev;
        link.appendChild(kep);

        let cim = document.createElement('div')
        link.appendChild(cim);
        let h2 = document.createElement('h2');
        h2.classList.add('cikkcim');
        h2.innerText = receptek[i].nev;
        cim.appendChild(h2);

        let leiras = document.createElement('div');
        leiras.classList.add('leiras')

        let paragraph = document.createElement('p');
        paragraph.innerText = 'Elkészítés: ' + receptek[i].elkeszites;
        leiras.appendChild(paragraph);

        paragraph = document.createElement('p');
        paragraph.innerText = 'Főzés/sütés: ' + receptek[i].fozes;
        leiras.appendChild(paragraph);

        paragraph = document.createElement('p');
        paragraph.innerText = 'Kalória: ' + receptek[i].kaloria;
        leiras.appendChild(paragraph);

        link.appendChild(leiras);
    }
}

window.onload = function () {
    összes();
    document.getElementById('varganya').addEventListener("click", törlés);
    document.getElementById('varganya').addEventListener("click", varganya);
    document.getElementById('roka').addEventListener("click", törlés);
    document.getElementById('roka').addEventListener("click", roka);
    document.getElementById('kucsma').addEventListener("click", törlés);
    document.getElementById('kucsma').addEventListener("click", kucsma);
    document.getElementById('osszes').addEventListener("click", törlés);
    document.getElementById('osszes').addEventListener("click", összes);
}