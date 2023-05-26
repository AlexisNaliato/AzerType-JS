
//afficher le Résultat.
function afficherResultat(score, nombreQuestion) {
//Récuperation de la zone de Score et l'afficher
    let zoneScore = document.querySelector(".zoneScore span");
    let affichageScore = `${score} / ${nombreQuestion}`

    zoneScore.innerText = affichageScore
    console.log("Votre score est de " + score + " sur " + nombreQuestion);
}

// Affichage du mot ou de la phrases
function afficherPropositions(proposition) {
    let zoneAffichage = document.querySelector(".zoneProposition")
    zoneAffichage.innerText = proposition
}

function afficherEmail(nom, email, score) {
    let mailto = `mailto:${email}?subject=Partage du score Azertype&body=Salut, je suis ${nom} et je viens de réaliser le score ${score} sur le site d'Azertype !`
    location.href = mailto
}

// Verification si les champ de saisie du formulaire sont vides 
function validerNom(nom) {
    if(nom.length < 2){
        throw new Error("Le nom est trop court .")
    }
    
}

function validerEmail(mail) {
    let emailRegExp = new RegExp("[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+")
    if(!emailRegExp.test(mail)) {
        throw new Error("L'email n'est pas valide .")
    }
}

//Si il y a une erreur dans le formulaire Crée un span avec le message d'erreur
function afficherMessageErreur(message) {
    let baliseNom = document.getElementById("nom")
    let baliseEmail = document.getElementById("email")


    let spanErreurMessage = document.getElementById("erreurMessage")

    if(!spanErreurMessage) {
        let popup = document.querySelector(".popup")
        spanErreurMessage = document.createElement("span")
        spanErreurMessage.id = "erreurMessage"

        popup.append(spanErreurMessage)
        
        baliseNom.value =''
        baliseEmail.value =''

    }
    spanErreurMessage.innerText = message
}

function gererFormulaire(scoreEmail) {
    
    try {
        let baliseNom = document.getElementById("nom")
        let nom = baliseNom.value
        validerNom(nom)

        let baliseEmail = document.getElementById("email")
        let mail = baliseEmail.value
        validerEmail(mail)
        afficherMessageErreur("") 
        afficherEmail(nom, mail, scoreEmail)
        baliseNom.value =''
        baliseEmail.value =''

    }catch(erreur) {
        afficherMessageErreur(erreur.message) 
    }
}



//lancer la boucle du jeu choisis.
function lancerJeu() {
    // Initialisation
    initEventListenerPopup()
    let score = 0;
    let i = 0
    let listePropositions = listeMots

    let btnValider = document.getElementById("btnValiderMot");
    let zoneDecriture = document.getElementById("inputEcriture");
    let listeInputsRadio = document.querySelectorAll(".zoneChoix input");


    afficherPropositions(listePropositions[i])
    // Appuyez sur la touche Entrer pour valider
    zoneDecriture.addEventListener("keypress", (event) => {
        if(event.key === "Enter") {
            event.preventDefault();
            btnValider.click()
        }
    })
    btnValider.addEventListener("click", () => {
        console.log(zoneDecriture.value)
        if(zoneDecriture.value === listePropositions[i]) {
            score++
        }
        i++
        afficherResultat(score, i)
        zoneDecriture.value =''
        if(listePropositions[i] === undefined) {
            afficherPropositions("Le jeu est fini")
            btnValider.disabled = true
        //On desactive les boutons radio quand le jeu est fini
            for(let indexBtnRadio = 0; indexBtnRadio < listeInputsRadio.length; indexBtnRadio++) {
                listeInputsRadio[indexBtnRadio].disabled = true
            }
        }else {
            afficherPropositions(listePropositions[i])
    }

});
    // Gestion de l'événement change sur les boutons radio
    for(let index = 0; index < listeInputsRadio.length; index++) {
        listeInputsRadio[index].addEventListener("change",(event) => {
            // si c'est le premier  élément qui modifié, alors nous voulons
            //jouer la listeMots
            if(event.target.value === "1") {
                listePropositions = listeMots
            }else {
                // Sinon nous voulons jouer avec la listePhrases
                listePropositions = listePhrases
            }
            // Et on modifie l'affichage en direct
            afficherPropositions(listePropositions[i])
        })
    
        //Récuperation des données du Formulaire de partage        
    let form = document.querySelector("form")
    form.addEventListener("submit", (event) => {
        event.preventDefault()
        let scoreEmail = `${score} / ${i}`
        gererFormulaire(scoreEmail)
    })
}


    afficherResultat(score, i)
}
