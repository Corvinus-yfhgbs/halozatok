let gombák;
let hónap;
hónapok = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"]


function lekerdezes() {
    hónap = Number(this.value);
    fetch('/gombak/gombák.json')
        .then(r => r.json())
        .then(d => letöltésbefejeződött(d));
}

function letöltésbefejeződött(data) {
    gombák = data;
    gombaMegjelenítés(gombák);
}

function törlés() {
    document.getElementById('gombák').innerHTML = '';
}

function gombaMegjelenítés() {
    törlés();
    let hova = document.getElementById('gombák');
    hova.innerText = "Gombák: "
    let selector = document.createElement('select');
    selector.id = "gombalista"
    selector.onchange = adatokMegjelenítés;
    hova.appendChild(selector);

    for (var i = 0; i < gombák.length; i++) {
        if (Number(gombák[i].kezd) <= hónap && Number(gombák[i].vége) >= hónap) {
            let option = document.createElement('option');
            option.value = gombák[i].azon;
            option.innerHTML = gombák[i].név;
            selector.appendChild(option);
        }

    }
}

function adatokMegjelenítés() {
    let kép = document.getElementById('kép')
    kép.src = '';

    let azon = this.value;
    let adat = document.getElementById('Mikortól');
    adat.innerHTML = hónapok[gombák[(azon - 1)].kezd-1];

    adat = document.getElementById('Meddig');
    adat.innerHTML = hónapok[gombák[(azon - 1)].vége-1];

    adat = document.getElementById('Lelőhely');
    adat.innerHTML = gombák[(azon - 1)].lelőhely;

    adat = document.getElementById('Védettség');
    adat.innerHTML = gombák[(azon - 1)].védett;

    adat = document.getElementById('kép');
    adat.src = "kepek/Ehető/" + gombák[(azon - 1)].azon + ".jpg";
    adat.classList.add('border')

    fetch('/gombak/hasonlo_gombak.json')
        .then(r => r.json())
        .then(d => hasonlók(d, azon));
}

function hasonlók(data, azon) {
    document.getElementById('mérgező').innerHTML = "";

    let hasonlók = data;

    for (var i = 0; i < hasonlók.length; i++) {
        let méreg = hasonlók[i].mereg;
        console.log(méreg)
        
        if (hasonlók[i].azon == azon) {
            if (méreg != 1) {

                fetch('/gombak/mergezo.json')
                    .then(r => r.json())
                    .then(d => mérgezőMegjelenítés(d, méreg));
            }
        }
    }
}

function mérgezőMegjelenítés(data, méreg) {
    let mérgezők = data;
    let azon = mérgezők[méreg - 1].azon;
    let hova = document.getElementById('mérgező');
    let fősor = document.createElement('div');
    fősor.classList.add('row')
    fősor.classList.add('alsószegély')
    hova.appendChild(fősor);

    let kép = document.createElement('img');
    kép.src = "kepek/Mérgező/" + azon + ".jpg";
    kép.classList.add('col-4');
    kép.classList.add('col-t-4');
    fősor.appendChild(kép);

    table = document.createElement('table');
    table.classList.add('col-8');
    table.classList.add('col-t-8');
    sor = document.createElement('tr');
    let név = document.createElement('td');
    név.innerHTML = "Név";
    név.classList.add("fejléc");
    sor.appendChild(név);
    let mérték = document.createElement('td');
    mérték.innerHTML = "Mérgezés mértéke";
    mérték.classList.add("fejléc");
    sor.appendChild(mérték);
    table.appendChild(sor);

    sor = document.createElement('tr');
    név = document.createElement('td');
    név.innerHTML = mérgezők[méreg - 1].név;
    sor.appendChild(név);
    mérték = document.createElement('td');
    mérték.innerHTML = mérgezők[méreg - 1].mérték;
    sor.appendChild(mérték);
    table.appendChild(sor);
    fősor.appendChild(table);
}


window.onload = function () {
    document.getElementById('selector').onchange = lekerdezes;
}
