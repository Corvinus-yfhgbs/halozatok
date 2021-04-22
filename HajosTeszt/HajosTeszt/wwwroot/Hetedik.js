var Kérdés;
var sorszám = 1;
var kérdésszám;


function kérdésBetöltés(id) {
    fetch(`/questions/${id}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás válasz: ${response.status}`)
            }
            else {
                return response.json()
            }
        })
        .then(data => kérdésMegjelenítés(data))
         
}

function kérdések() {
    fetch(`/questions/all`)
        .then(response => response.json())
        .then(data => összeskérdés(data))
}

function összeskérdés(data) {
    kérdésszám = Object.keys(data).length

}

function kérdésMegjelenítés(kérdés) {
    Kérdés = kérdés;
    document.getElementById("kérdés_szöveg").innerText = kérdés.questionText
    document.getElementById("válasz1").innerText = kérdés.answer1
    document.getElementById("válasz2").innerText = kérdés.answer2
    document.getElementById("válasz3").innerText = kérdés.answer3
    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
    }
    else {
        document.getElementById("kép1").src = "";
    }
}

function előre() {
    if ((kérdésszám) == sorszám) {
        sorszám = 1;
    } else {
        sorszám += 1;
    }
    kérdésBetöltés(sorszám)
    document.getElementById("válasz1").style.backgroundColor = "#ffffffcf";
    document.getElementById("válasz2").style.backgroundColor = "#ffffffcf";
    document.getElementById("válasz3").style.backgroundColor = "#ffffffcf";
}

function vissza() {
    if (sorszám == 1) {
        sorszám = kérdésszám;
    } else {
        sorszám -= 1;
    }

    kérdésBetöltés(sorszám)
    document.getElementById("válasz1").style.backgroundColor = "#ffffffcf";
    document.getElementById("válasz2").style.backgroundColor = "#ffffffcf";
    document.getElementById("válasz3").style.backgroundColor = "#ffffffcf";
}


function ellenőrzés1() {
    if (Kérdés.correctAnswer == 1) {
        document.getElementById("válasz1").style.backgroundColor = "green";
    } else {
        document.getElementById("válasz1").style.backgroundColor = "red";
    }
}

function ellenőrzés2() {
    if (Kérdés.correctAnswer == 2) {
        document.getElementById("válasz2").style.backgroundColor = "green";
    } else {
        document.getElementById("válasz2").style.backgroundColor = "red";
    }

}


function ellenőrzés3() {
    if (Kérdés.correctAnswer == 3) {
        document.getElementById("válasz3").style.backgroundColor = "green";
    } else {
        document.getElementById("válasz3").style.backgroundColor = "red";
    }

}


window.onload = function () {
    kérdésBetöltés(sorszám);
    kérdések();
    document.getElementById("vissza").onclick = vissza;
    document.getElementById("előre").onclick = előre;
    document.getElementById("válasz1").onclick = ellenőrzés1;
    document.getElementById("válasz2").onclick = ellenőrzés2;
    document.getElementById("válasz3").onclick = ellenőrzés3;
}

