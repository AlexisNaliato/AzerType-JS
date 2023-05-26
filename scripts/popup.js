// Script pour afficher la popup du  Formulaire de partage.

function afficherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.add("active")
}

function cacherPopup() {
    let popupBackground = document.querySelector(".popupBackground")
    popupBackground.classList.remove("active")
}

// Si les inputs sont remplie les vider quand la popu s'affiche
function vidageInput() {
    let popupInputNom = document.getElementById("nom")
    let popupInputMail = document.getElementById("email")

    if(popupInputMail.value != '' && popupInputNom.value != '') {
        popupInputNom.value =''
        popupInputMail.value =''
    }
}

function initEventListenerPopup() {

    btnPartage = document.querySelector(".zonePartage")
    let popupBackground = document.querySelector(".popupBackground")
    btnPartage.addEventListener("click", () => {

        vidageInput()
        afficherPopup()

    })

    popupBackground.addEventListener("click", (event) => {
    
        if(event.target === popupBackground) {
            cacherPopup()
        }
    })
}