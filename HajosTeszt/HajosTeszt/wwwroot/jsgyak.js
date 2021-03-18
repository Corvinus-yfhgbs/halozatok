function faktoriális(n) {
    let er = 1
    for (let i = 2; i <= n; i++) {
        er = er*i
    }
    return er
}

function pascalF() {
    let hova = document.getElementById("pascal");
    for (var s = 0; s < 10; s++) {
        let sor = document.createElement("div");
        sor.classList.add("sor");
        hova.appendChild(sor);
        for (var o = 0; o <= s; o++) {
            let elem = document.createElement("div");
            elem.classList.add("elem");
            sor.appendChild(elem)
            elem.innerText = faktoriális(s) / (faktoriális(o) * faktoriális(s - o));
            let szam = faktoriális(s) / (faktoriális(o) * faktoriális(s - o))
            elem.style.backgroundColor = `rgba(234,123,124,${szam/100})`;
        }
    }
}