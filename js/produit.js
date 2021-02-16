
function addToBasket(selectedLense) {
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));
    if (basketContent === null) {
        basketContent = [];
    }
    let product = new Camera(id, selectedLense);
    basketContent.push(product);
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
    let basketNavlink = document.querySelector(".basket");
    basketNavlink.textContent = "Panier(" + basketContent.length + ")";
}

////////////////////////// Ajouter les information produit dans le HTML ////////////////  
function addProductInfo(response) {
    const container = document.querySelector("#product-container");

    const div = document.createElement("div");
    div.setAttribute("class", "col-10 col-md-8 p-1 mb-5 produit");

    const img = document.createElement("img");
    img.setAttribute("src", response.imageUrl);
    img.setAttribute("width", "100% ");
    img.setAttribute("class", "rounded-top border border-dark");

    const title = document.createElement("h3");
    title.innerHTML = response.name;
    title.setAttribute("class", "text-center m-2 pb-3");

    const description = document.createElement("div");
    description.innerHTML = response.description;
    description.setAttribute("class", "mb-2 pb-4");

    const lenses = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Choix d'une option";
    lenses.appendChild(defaultOption);

    // Ajout des options à sélectionner //
    for (i = 0; i < response.lenses.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", response.lenses[i]);
        option.textContent = response.lenses[i];
        lenses.appendChild(option);
    }

    const price = document.createElement("p");
    price.textContent = response.price / 100 + " euros";
    price.setAttribute("class", "h4 m-2 pb-2")

    const divBtn = document.createElement("div");
    divBtn.setAttribute("class", "messageBox");

    const btn = document.createElement("button");
    btn.innerHTML = "<span>Ajouter au panier </span>";
    btn.setAttribute("class", "btn btn-dark mb-2 p-3 button")
    btn.addEventListener("click", () => {
        const messageDiv = document.createElement("div");
        messageDiv.setAttribute("class", "message");
        divBtn.append(messageDiv);
        deletMessage();
        const lenses = document.querySelector("select");
        const selectedLense = lenses.value;
        if (selectedLense != "Choix d'une option") {
            // rajouter au panier
            successBasketMessage();
            addToBasket(selectedLense);
        } else {
            selectMessage();
        }

    });
    ////// bouton panier //////
    const basketBtn = document.createElement("button");
    basketBtn.innerHTML = "<span>Voir le panier </span>";
    basketBtn.setAttribute("class", "btn button btn-dark p-3");
    basketBtn.addEventListener("click", () => {
        window.location.href = "panier.html";
    });

    container.appendChild(div);
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(lenses);
    div.appendChild(price);
    div.appendChild(divBtn);
    divBtn.appendChild(btn);
    div.appendChild(basketBtn);
}

// Ajouter le nombre d'article du panier //
function basketContentNav() {
    if (localStorage.length != 0) {
        let basketContent = JSON.parse(localStorage.getItem("basketContent"));
        let basketNavlink = document.querySelector(".basket");
        basketNavlink.textContent = "Panier(" + basketContent.length + ")";
    }
}
////// apparition du message confirmant l'ajout au panier ///////
function successBasketMessage() {
    const messageBox = document.querySelector(".messageBox");
    const messageDiv = document.createElement("div");
    messageDiv.setAttribute("class", "message");
    let successMessage = document.createElement("div");
    successMessage.setAttribute("class", "col mt-2 alert alert-success text-center anim shadow");
    successMessage.innerHTML = "Votre article à bien été ajouté au panier";
    messageBox.append(messageDiv);
    messageDiv.append(successMessage);
}
///////// message disant qu'un choix d'option est obligatoir /////
function selectMessage() {
    const messageBox = document.querySelector(".messageBox");
    const messageDiv = document.createElement("div");
    messageDiv.setAttribute("class", "message");
    let selectMessage = document.createElement("div");
    selectMessage.setAttribute("class", "col mt-2 alert alert-danger text-center anim shadow");
    selectMessage.innerHTML = "Merci de choisir une option";
    messageBox.append(messageDiv);
    messageDiv.append(selectMessage);
}
///////// suppression des messages //////
function deletMessage() {
    const messageDiv = document.querySelector(".message");
    messageDiv.parentNode.removeChild(messageDiv);
}

///////////////////////////////// Ajouter la div information produit ///////////////
function getProduct() {

    // récupérer l'url avec le bon Id
    function getId() {
        const params = (new URL(window.location)).searchParams;
        let id = params.get("id");
        return id;
    }
    id = getId();

    // récupérer la réponse de l'API 
    fetch("http://localhost:3000/api/cameras/" + id)
        .then(response => response.json())
        .then(response => {
            addProductInfo(response);
            basketContentNav();
        })
        .catch((err) => {
            console.log(err);
            alert("Problème de serveur, merci de revenir plus tard.");
        });

}
getProduct();

