// Vide le contenu de la gallerie
document.querySelector(".gallery").innerHTML = "";

const sectionPortfolio = document.getElementById('portfolio');
const divGallery = document.querySelector(".gallery");
const divGalerieModale = document.getElementById("galerie-modale");

// Création du menu filtres avec createElement et appendChild

const createFiltres = document.createElement("div");
createFiltres.id = "filtres";
sectionPortfolio.insertBefore(createFiltres, divGallery);
const divFiltres = document.getElementById("filtres");
let filtreTous = document.createElement("div");
filtreTous.innerHTML = "Tous";
filtreTous.id = "tous";
let filtreObjets = document.createElement("div");
filtreObjets.innerHTML = "Objets";
filtreObjets.id = "objets";
let filtreApparts = document.createElement("div");
filtreApparts.innerHTML = "Appartements";
filtreApparts.id = "apparts";
let filtreHotels = document.createElement("div");
filtreHotels.innerHTML = "Hôtels & restaurants";
filtreHotels.id = "hotels";
divFiltres.appendChild(filtreTous);
divFiltres.appendChild(filtreObjets);
divFiltres.appendChild(filtreApparts);
divFiltres.appendChild(filtreHotels);
const divTous = document.getElementById("tous");
const divObjets = document.getElementById("objets");
const divApparts = document.getElementById("apparts");
const divHotels = document.getElementById("hotels");

// Définition des styles du menu filtres

divFiltres.style.display = "flex";
divFiltres.style.justifyContent = "center";
divFiltres.style.marginBottom = "50px";

let stylesFiltres = {
    "fontFamily": "Syne",
    "fontSize": "16px",
    "fontStyle": "normal",
    "fontWeight": "700",
    "color": "#1D6154",
    "border": "1px solid #1D6154",
    "borderRadius": "60px",
    "marginRight": "10px",
    "padding": "10px",
    "textAlign": "center",
};

Object.assign(divTous.style, stylesFiltres);
Object.assign(divObjets.style, stylesFiltres);
Object.assign(divApparts.style, stylesFiltres);
Object.assign(divHotels.style, stylesFiltres);
divTous.style.padding = "10px 30px";
divObjets.style.padding = "10px 20px";

// Style du filtre actif, par défaut : tous

let styleFiltreActif = {
    "color": "#FFFFFF",
    "backgroundColor": "#1D6154"
};

Object.assign(divTous.style, styleFiltreActif);

// Style du filtre inactif

let styleFiltreInactif = {
    "color": "#1D6154",
    "backgroundColor": "#FFFFFF"
}

// Requête fetch pour récupérer l'ensemble des travaux et les ajouter dans la section galerie et la fenêtre modale

fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListWorks => {
        for (let jsonWorks of jsonListWorks) {
            let work = new Works(jsonWorks);
            divGallery.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
            divGallery.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
            divGallery.querySelector("figure:last-child").setAttribute("id", "galerie" + work.id);
            divGallery.querySelector("figure:last-child").setAttribute("class", work.category.name);
            divGallery.querySelector("figure:last-child img").setAttribute("crossorigin", "");
            divGallery.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
            divGallery.querySelector("figure:last-child img").setAttribute("alt", work.title);
            divGallery.querySelector("figure:last-child figcaption").append(work.title);
            divGalerieModale.appendChild(document.createElement('figure')).appendChild(document.createElement('img'));
            divGalerieModale.querySelector("figure:last-child").appendChild(document.createElement('div')).setAttribute("class", "poubelles");
            divGalerieModale.querySelector("div:last-child").setAttribute("id", "poubelle" + work.id);
            divGalerieModale.querySelector("div:last-child").appendChild(document.createElement('i')).setAttribute("class", "fa-regular fa-trash-can fa-2xs");
            divGalerieModale.querySelector("figure:last-child i").setAttribute("style", "color: #FFFFFF");
            divGalerieModale.querySelector("figure:last-child").appendChild(document.createElement('figcaption'));
            divGalerieModale.querySelector("figure:last-child").setAttribute("id", "galerie-modale" + work.id);
            divGalerieModale.querySelector("figure:last-child").setAttribute("class", work.category.name);
            divGalerieModale.querySelector("figure:last-child img").setAttribute("crossorigin", "");
            divGalerieModale.querySelector("figure:last-child img").setAttribute("src", work.imageUrl);
            divGalerieModale.querySelector("figure:last-child img").setAttribute("alt", work.title);
            divGalerieModale.querySelector("figure:last-child figcaption").append("éditer");
        } 
        divGalerieModale.querySelector("figure:first-child").appendChild(document.createElement('div'));
        divGalerieModale.querySelector("div:last-child").appendChild(document.createElement('i')).setAttribute("class", "fa-solid fa-up-down-left-right fa-2xs");
        divGalerieModale.querySelector("div:last-child").id = "move";
        afficheFiltres();
        supprimerTravail();
        telechargerPhoto();
        annuleTelechargementPhoto();
    })

    .catch(function (err) {
        // Une erreur est survenue
        console.log(err);
});


// Styles de soulignage des filtres au passage de la souris

divObjets.onmouseover = function() 
    {
        this.style.textDecoration = "underline";
    }

divObjets.onmouseout = function() 
    {
        this.style.textDecoration = "none";
    }

divTous.onmouseover = function() 
    {
        this.style.textDecoration = "underline";
    }

divTous.onmouseout = function() 
    {
        this.style.textDecoration = "none";
    }

divApparts.onmouseover = function() 
    {
        this.style.textDecoration = "underline";
    }

divApparts.onmouseout = function() 
    {
        this.style.textDecoration = "none";
    }

divHotels.onmouseover = function() 
    {
        this.style.textDecoration = "underline";
    }

divHotels.onmouseout = function() 
    {
        this.style.textDecoration = "none";
    }

// Fonction qui filtre les travaux en fonction du filtre cliqué retardée pour que le fetch ait le temps de se charger

function afficheFiltres() {
    const allWorks = divGallery.innerHTML;
        divObjets.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreInactif);
        Object.assign(divApparts.style, styleFiltreInactif);
        Object.assign(divHotels.style, styleFiltreInactif);
        Object.assign(divObjets.style, styleFiltreActif);
        const selectNonObjets = divGallery.querySelectorAll("figure");
        const monSet = new Set();
        for (let i = 0; i < selectNonObjets.length; i++) {
            if (selectNonObjets[i].classList != "Objets") {
                monSet.add(selectNonObjets[i].id)
            }
        }
        for (let item of monSet) {
            divGallery.removeChild(document.getElementById(item));
        }
    })

    divApparts.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreInactif);
        Object.assign(divApparts.style, styleFiltreActif);
        Object.assign(divHotels.style, styleFiltreInactif);
        Object.assign(divObjets.style, styleFiltreInactif);
        const selectNonApparts = divGallery.querySelectorAll("figure");
        const monSet = new Set();
        for (let i = 0; i < selectNonApparts.length; i++) {
            if (selectNonApparts[i].classList != "Appartements") {
                monSet.add(selectNonApparts[i].id)
            }
        }
        for (let item of monSet) {
            divGallery.removeChild(document.getElementById(item));
        }
    })

    divHotels.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreInactif);
        Object.assign(divApparts.style, styleFiltreInactif);
        Object.assign(divHotels.style, styleFiltreActif);
        Object.assign(divObjets.style, styleFiltreInactif);
        const selectNonHotels = divGallery.querySelectorAll("figure");
        const monSet = new Set();
        for (let i = 0; i < selectNonHotels.length; i++) {
            if (selectNonHotels[i].classList != "Hotels & restaurants") {
                monSet.add(selectNonHotels[i].id)
            }
        }
        for (let item of monSet) {
            divGallery.removeChild(document.getElementById(item));
        }
    })

    divTous.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        Object.assign(divTous.style, styleFiltreActif);
        Object.assign(divApparts.style, styleFiltreInactif);
        Object.assign(divHotels.style, styleFiltreInactif);
        Object.assign(divObjets.style, styleFiltreInactif);
        }
    )
    }

let modale = null;
const cible = document.getElementById("modale");

const ouvrirModale = function (e) {
    e.preventDefault();
    cible.style.display = null;
    cible.removeAttribute("aria-hidden");
    cible.setAttribute("aria-model", "true");
    modale = cible;
    modale.addEventListener("click", fermerModale);
    modale.querySelector(".js-fermer-modale").addEventListener("click", fermerModale);
    modale.querySelector(".js-stop-modale").addEventListener("click", stopPropagation);    
}

const fermerModale = function (e) {
    if (modale === null) return;
    e.preventDefault();
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-model");
    modale.removeEventListener("click", fermerModale);
    modale.querySelector(".js-fermer-modale").removeEventListener("click", fermerModale);
    modale.querySelector(".js-stop-modale").addEventListener("click", stopPropagation);
    modale = null;
}

const stopPropagation = function (e) {
    e.stopPropagation();
}

document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", ouvrirModale)
})

function supprimerTravail() {
    const allWorks = divGallery.innerHTML;
    const worksModale = divGalerieModale.innerHTML;
    document.querySelectorAll(".poubelles").forEach(poubelle => {
        poubelle.addEventListener('click', function () {
        divGallery.innerHTML = allWorks;
        divGalerieModale.innerHTML = worksModale;
        const idPoubelle = poubelle.id.split("poubelle")[1];
        const url = "http://localhost:5678/api/works/" + idPoubelle;
        fetch(url, {
            method: "DELETE",
            headers: {
                'Accept': '/',
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY3MzI5MzI0NCwiZXhwIjoxNjczMzc5NjQ0fQ.WNpy5cwnORBXbUX2IKqJ4-mGdE3fez8L5sMSfAoFi5M'
        }})
        .then(function (res) {
            if (res.ok) {
                alert("Le travail a bien été supprimé");
                const idGaleriePoubelle = "galerie" + idPoubelle;
                const idGalerieModalePoubelle = "galerie-modale" + idPoubelle;
                divGallery.removeChild(document.getElementById(idGaleriePoubelle));
                divGalerieModale.removeChild(document.getElementById(idGalerieModalePoubelle));
            }
        })
        
        .catch(function (err) {
            // Une erreur est survenue
            alert("Erreur dans la suppression du travail");
        });
})
    })
}

let modale2 = null;
const cible2 = document.getElementById("modale2");

const ouvrirModale2 = function (e) {
    e.preventDefault();
    modale.style.display = "none";
    modale.setAttribute("aria-hidden", "true");
    modale.removeAttribute("aria-model");
    cible2.style.display = null;
    cible2.removeAttribute("aria-hidden");
    cible2.setAttribute("aria-model", "true");
    modale2 = cible2;
    modale2.addEventListener("click", fermerModale2);
    modale2.querySelector(".js-fermer-modale2").addEventListener("click", fermerModale2);
    modale2.querySelector(".js-retour").addEventListener("click", function (e){
        e.preventDefault();
        modale2.style.display = "none";
        modale2.setAttribute("aria-hidden", "true");
        modale2.removeAttribute("aria-model");
        ouvrirModale;
    });
    modale2.querySelector(".js-stop-modale2").addEventListener("click", stopPropagation);    
}

const fermerModale2 = function (e) {
    if (modale2 === null) return;
    e.preventDefault();
    modale2.style.display = "none";
    modale2.setAttribute("aria-hidden", "true");
    modale2.removeAttribute("aria-model");
    modale2.removeEventListener("click", fermerModale2);
    modale2.querySelector(".js-fermer-modale2").removeEventListener("click", fermerModale2);
    modale2.querySelector(".js-retour").removeEventListener("click", fermerModale2);
    modale2.querySelector(".js-stop-modale2").addEventListener("click", stopPropagation);
    modale2 = null;
}

document.querySelectorAll(".js-modale2").forEach(a => {
    a.addEventListener("click", ouvrirModale2)
})




function telechargerPhoto(){
document.getElementById("myfile").addEventListener("change", function (){
     const fichierTelecharge = document.getElementById("myfile").files[0];
  if (fichierTelecharge.length === 0) {
    alert("Veuillez choisir un fichier")
  } else {
        function recupExtension(chemin){
        let regex = /[^.]*$/i;
        let resultats = chemin.match(regex);
        return resultats[0];
    }
        if (recupExtension(fichierTelecharge.name) == "png" || recupExtension(fichierTelecharge.name) == "jpg") {
        if (fichierTelecharge.size < 32000000) {
            
            const image = document.createElement('img');
            image.id = "imageTelechargee"
            image.src = URL.createObjectURL(fichierTelecharge);
            let styleImage = {
                "max-width": "100%",
                "min-width": "100%"
            }
            Object.assign(image.style, styleImage);
            document.getElementById("ajout-image").getElementsByTagName("i")[0].setAttribute("style", "display: none");
            document.getElementById("ajout-image").getElementsByTagName("label")[0].setAttribute("style", "display: none");
            document.getElementById("ajout-image").getElementsByTagName("input")[0].setAttribute("style", "display: none");
            document.getElementById("ajout-image").getElementsByTagName("p")[0].setAttribute("style", "display: none");
            document.getElementById("ajout-image").appendChild(image);
            
        } else {
            alert("Erreur : Le fichier est trop volumineux")
        }
    } else {
      alert("Erreur : Seuls les formats .jpg et .png sont valides");
    }
  }
});
}

document.querySelector(".js-fermer-modale2").addEventListener("click", annuleTelechargementPhoto);
document.querySelector(".js-retour").addEventListener("click", annuleTelechargementPhoto);

function annuleTelechargementPhoto (){
    if(document.getElementById("imageTelechargee") === document.getElementById("ajout-image").lastChild){
    document.getElementById("ajout-image").getElementsByTagName("i")[0].removeAttribute("style", "display: none");
    document.getElementById("ajout-image").getElementsByTagName("label")[0].removeAttribute("style", "display: none");
    document.getElementById("ajout-image").getElementsByTagName("input")[0].removeAttribute("style", "display: none");
    document.getElementById("ajout-image").getElementsByTagName("p")[0].removeAttribute("style", "display: none");
    document.getElementById("ajout-image").removeChild(document.getElementById("imageTelechargee"));
    } else { return null;}
};

/*

function recupDonneesPhoto (){
    validerFormulaire();
    let formElement = document.getElementById("ajout-photo");
    formElement.addEventListener("submit", function(e) {
    let formData = new FormData();

    formData.append()

    let request = new XMLHttpRequest();
    request.open("POST", "submitform.php");
    request.send(new FormData(formElement));
    }
    
    
    )

}

function validerFormulaire() {
    
    if (document.getElementById("imageTelechargee") === document.getElementById("ajout-image").lastChild) {
        if (document.getElementById("categorie").value != "") {
            document.getElementById("ajout-photo").removeAttribute("disabled");
            document.getElementById("valider").onmouseover = function () {
                this.style.cursor = "pointer";
            }
            document.getElementById("valider").onmouseout = function () {
                this.style.cursor = "auto";
            }
        }
    } else return null;
}

*/