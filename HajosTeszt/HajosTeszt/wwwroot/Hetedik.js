var hotList = [];
var QuestionsInhotList = 3;
var displayedQuestion;
var numberOfQuestions;
var nextQuestion = 1;
var timerHandler;


function init() {
    for (let i = 0; i < QuestionsInhotList; i++) {
        hotList[1] = (
            question: {},
            goodAnswers: 0
        )
    }

    fetch(`/questions/count`)
        .then(result => result.text())
        .then(n => { numberOfQuestions = parseInt(n) })

    if (localStorage.getItem("hotList")) {
        hotList = JSON.parse(localStorage.getItem("hotList"));
    }

    if (localStorage.getItem("displayedQuestion")) {
        displayedQuestion = parseInt(localStorage.getItem("displayedQuestion"));
    }

    if (localStorage.getItem("nextQuestion")) {
        nextQuestion = parseInt(localStorage.getItem("nextQuestion"));
    }

    if (hotList.length > n) {
        for (let i = 0; i < QuestionsInhotList; i++) {
            kérdésBetöltés(nextQuestion, i);
            nextQuestion++;
        }
    } else {
        kérdésMegjelenítés();
    }

}

function kérdésBetöltés(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(response => {
            if (!response.ok) {
                console.error(`Hibás letöltés: ${response.status}`);
                return null
            }
            else {
                return response.json()
            }
        })
        .then(q => {
            hotList[destination].question = q;
            hotList[destination].correctAnswer = 0;
            console.log(`A ${questionNumber}, kérdés letöltésre került a hotlist ${destination}. helyére`);
            if (displayedQuestion == undefined && destination == 0) {
                displayedQuestion = 0;
                kérdésMegjelenítés();
            }
        })
         
}

function kérdésMegjelenítés() {
    let kérdés = hotList[displayedQuestion].question;
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

    for (var i = 0; i <= 3; i++) {
        document.getElementById(`válasz`+i).style.backgroundColor = "#ffffffcf";
    }

    document.getElementById('válaszok').style.pointerEvents = "auto";
}

function előre() {
    clearTimeout(timerHandler);
    displayedQuestion++;
    if (displayedQuestion == QuestionsInhotList) {
        displayedQuestion = 0
    }
    kérdésMegjelenítés();
}

function vissza() {
    displayedQuestion--;
    if (displayedQuestion == QuestionsInhotList) {
        displayedQuestion = 3
    }
    kérdésMegjelenítés();
}

function választás(n) {
    let kérdés = hotList[displayedQuestion].question;
    if (n == kérdés.correctAnswer) {
        document.getElementById(`válasz` + n).style.backgroundColor = "green";
        hotList[displayedQuestion].goodAnswers++;
        if (hotList[displayedQuestion].goodAnswers==3) {
            kérdésBetöltés(nextQuestion, displayedQuestion);
            nextQuestion++;
        }
    } else {
        document.getElementById(`válasz` + n).style.backgroundColor = "red";
        document.getElementById(`válasz` + kérdés.correctAnswer).style.backgroundColor = "red";
        hotList[displayedQuestion].goodAnswers = 0;
    }

    document.getElementById('válaszok').style.pointerEvents = "none";
    timerHandler = setTimeout(előre, 3000);

    localStorage.setItem("hotList", JSON.stringify(hotList));
    localStorage.setItem("displayedQuestion", displayedQuestion);
    localStorage.setItem("nextQuestion", nextQuestion);
}


window.onload = function () {
    init();
    document.getElementById("vissza").onclick = vissza;
    document.getElementById("előre").onclick = előre;
    document.getElementById("válasz1").onclick = választás(1);
    document.getElementById("válasz2").onclick = választás(2);
    document.getElementById("válasz3").onclick = választás(3);
}

