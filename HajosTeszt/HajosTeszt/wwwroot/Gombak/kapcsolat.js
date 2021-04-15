function törlés() {
    let info = document.getElementById('kapcsinfo');
    info.innerHTML = '';

    if (document.getElementById("hibafájl")) {
        let fájl = document.getElementById("hibafájl");
        fájl.innerHTML = '';
    }

}

function válasz() {
    törlés();
    let value = this.value;
    let hova = document.getElementById("kapcsinfo");
    let figyelem = document.createElement("h2");
    let szöveg = document.createElement("p");

    if (value == "hiba") {
        figyelem.innerText = "Figyelem!";
        figyelem.classList.add("cikkcim");
        hova.appendChild(figyelem);
        szöveg.innerText = "Kérlek, pontosan fogalmazz, hogy megkönnyítsd a munkánkat, és minél hamarabb javíthassuk a hibát. Ha a megértést segíti, kérlek, tölts fel egy fájlt.";
        hova.appendChild(szöveg);

        hova = document.getElementById("lista");
        let div = document.createElement("div");
        div.id = "hibafájl"
        hova.appendChild(div);
        hova = document.getElementById("hibafájl");

        let sor = document.createElement("br");
        hova.appendChild(sor);
        sor = document.createElement("br");
        hova.appendChild(sor);

        let label = document.createElement("label");
        label.innerText = "Válassz egy fájlt:";
        hova.appendChild(label);

        sor = document.createElement("br");
        hova.appendChild(sor);

        let fájl = document.createElement("input");
        fájl.type = "file";
        fájl.id = "fájl";
        fájl.name = "fájl";
        hova.appendChild(fájl);

    } else if (value == "kérdés") {
        figyelem.innerText = "Figyelem!";
        figyelem.classList.add("cikkcim");
        hova.appendChild(figyelem);
        szöveg.innerText = "Köszönjük, hogy megkeresel minket! Igyekszünk minél hamarabb válasszal szolgálni a megadott email címre!";
        hova.appendChild(szöveg);
    }
}


window.onload = function () {
    document.getElementById('selector').onchange = válasz;
}

