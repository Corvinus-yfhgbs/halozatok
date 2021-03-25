var kérdések;
var sorszám = 0;


function letöltés(){
    fetch('/questions.json')
        .then(r => r.json())
        .then(d => letöltésbefejeződött(d));
}

function letöltésbefejeződött(data) {
    console.log("Sikeres letöltés")
    console.log(data)
    kérdések = data;
    kérdésMegjelenítés(sorszám);
}

function kérdésMegjelenítés(k) {
    let hova = document.getElementById("kérdés_szöveg")
    hova.innerHTML = kérdések[k].questionText;
    document.getElementById("válasz1").innerHTML = kérdések[k].answer1;
    document.getElementById("válasz2").innerHTML = kérdések[k].answer2;
    document.getElementById("válasz3").innerHTML = kérdések[k].answer3;
    if (kérdések[k].image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdések[k].image;
    } else {
        document.getElementById("kép1").src = "";
    }
}

function előre() {
    if ((kérdések.length-1) == sorszám) {
        sorszám = 0;
    } else {
        sorszám += 1;
    }
    kérdésMegjelenítés(sorszám)

    document.getElementById("válasz1").style.backgroundColor = "#ffffffcf";
    document.getElementById("válasz2").style.backgroundColor = "#ffffffcf";
    document.getElementById("válasz3").style.backgroundColor = "#ffffffcf";
}

function vissza() {
    if (sorszám == 0) {
        sorszám = kérdések.length-1;
    } else {
        sorszám -= 1;
    }

    kérdésMegjelenítés(sorszám)
    document.getElementById("válasz1").style.backgroundColor = "#ffffffcf";
    document.getElementById("válasz2").style.backgroundColor = "#ffffffcf";
    document.getElementById("válasz3").style.backgroundColor = "#ffffffcf";
}


function ellenőrzés1() {
    if (kérdések[sorszám].correctAnswer == 1) {
        document.getElementById("válasz1").style.backgroundColor = "green";
    } else {
        document.getElementById("válasz1").style.backgroundColor = "red";
    }
}

function ellenőrzés2() {
    if (kérdések[sorszám].correctAnswer == 2) {
        document.getElementById("válasz2").style.backgroundColor = "green";
    } else {
        document.getElementById("válasz2").style.backgroundColor = "red";
    }

}


function ellenőrzés3() {
    if (kérdések[sorszám].correctAnswer == 3) {
        document.getElementById("válasz3").style.backgroundColor = "green";
    } else {
        document.getElementById("válasz3").style.backgroundColor = "red";
    }

}


window.onload = function () {
    letöltés();
    document.getElementById("vissza").onclick = vissza;
    document.getElementById("előre").onclick = előre;
    document.getElementById("válasz1").onclick = ellenőrzés1;
    document.getElementById("válasz2").onclick = ellenőrzés2;
    document.getElementById("válasz3").onclick = ellenőrzés3;
}

