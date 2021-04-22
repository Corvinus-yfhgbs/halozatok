var sorszám = 1;


function letöltés(id){
   fetch(`/questions/${id}`)
       .then(response => {
           if (!response.ok) {
               console.error(`Hibás válasz: ${response.status}`)
           }
           else {
               return response.json()
           }
       })
            .then(data => kérdésMegjelenítés(data));  
}

function kérdésMegjelenítés(kérdés) {
    let hova = document.getElementById("kérdés_szöveg")
    hova.innerHTML = kérdés.questionText;
    document.getElementById("válasz1").innerHTML = kérdés.answer1;
    document.getElementById("válasz2").innerHTML = kérdés.answer2;
    document.getElementById("válasz3").innerHTML = kérdés.answer3;
    if (kérdés.image != "") {
        document.getElementById("kép1").src = "https://szoft1.comeback.hu/hajo/" + kérdés.image;
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
    letöltés(sorszám)

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

    letöltés(sorszám)
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
    letöltés(sorszám);
    document.getElementById("vissza").onclick = vissza;
    document.getElementById("előre").onclick = előre;
    document.getElementById("válasz1").onclick = ellenőrzés1;
    document.getElementById("válasz2").onclick = ellenőrzés2;
    document.getElementById("válasz3").onclick = ellenőrzés3;
}

