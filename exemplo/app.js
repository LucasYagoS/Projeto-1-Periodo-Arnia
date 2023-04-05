function next() {
    const rola = document.getElementById("rola")
    const caralho = document.getElementById("caralho")
    
    rola.innerHTML.className = "caralho"
    caralho.innerHTML.className = "rola"
    console.log(rola)
    console.log(caralho)
}