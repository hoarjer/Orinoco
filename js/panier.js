// Ajouter le nombre d'article du panier //
function basketContentNav() {
    if (localStorage.length != 0) {
        let basketContent = JSON.parse(localStorage.getItem("basketContent"));
        let basketNavlink = document.querySelector(".basket");
        basketNavlink.textContent = "Panier(" + basketContent.length + ")";
    }
}
basketContentNav();

/////////////////////////////// Ajouter les éléments html ////////////////////////////
function addBasketProduct(
    productInfo,
    productBasket,
    basketContent,
    totalPrice
) {
    const basket = document.querySelector(".basket-container");

    const product = document.createElement("div");
    product.setAttribute("class", "row justify-content-around mb-5");

    // ligne de séparation //
    const line = document.createElement("div");
    line.setAttribute("class", "col");
    line.innerHTML = "<hr>";

    const divTitle = document.createElement("div");
    divTitle.setAttribute("class", "col-4 divTitle");

    const name = document.createElement("p");
    name.setAttribute("class", "h4");
    name.textContent = productInfo.name;

    const img = document.createElement("img");
    img.innerHTML = productInfo.imageUrl;
    img.setAttribute("src", productInfo.imageUrl);
    img.setAttribute("class", "basketImg");

    ///////////// bouton de suppression ///////////
    const btn = document.createElement("button");
    btn.textContent = "Supprimer";
    btn.setAttribute("class", "bg-dark text-light mt-2 suppBtn");
    btn.setAttribute("data-id", productInfo._id);

    const lenses = document.createElement("div");
    lenses.setAttribute("class", "col-4 mt-5");
    lenses.textContent = productBasket.lenses;

    const price = document.createElement("div");
    price.setAttribute("class", "col-4 mt-5");
    price.textContent = productInfo.price / 100 + " €";
    // Calcul du prix total //
    totalPrice = totalPrice + productInfo.price / 100;

    /////////// évènements "supprimer" /////////
    btn.addEventListener("click", function (e) {
        const id = e.target.getAttribute("data-id");

        for (let i = 0; i != basketContent.length; i++) {
            if (basketContent[i].id === id) {
                basketContent.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("basketContent", JSON.stringify(basketContent));
        // Changement du nombre d'article du lien de navigation "panier" //
        let basketNavlink = document.querySelector(".basket");
        basketNavlink.textContent = "Panier(" + basketContent.length + ")";
        window.location.href = "panier.html";
    })

    basket.append(product);
    basket.append(line);
    product.append(divTitle);
    divTitle.append(name);
    divTitle.append(img);
    divTitle.append(btn);
    product.append(lenses);
    product.append(price);

    return totalPrice;
}

///////////// fonctions de vérification formulaires ///////
function alphaRegexe(value) {
    return /[A-Za-z]/.test(value);
}

function emailRegexe(value) {
    return /^\w+([\.-]?\w+)+@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
}

function adressRegexe(value) {
    return /\w+/.test(value);
}

/////////// vérification du formulaire de nom //////
function checkNameForm(orderValidity) {
    const name = document.querySelector(".name");
    const input = document.querySelector("#name");
    if (input.value === "") {
        const errorMessage = document.createElement("p");
        errorMessage.setAttribute("class", "errorMessage");
        errorMessage.innerHTML = "Merci d'indiquer votre nom.";
        orderValidity = false;
        name.append(errorMessage);
    } else {
        if (alphaRegexe(input.value) === false) {
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "text-error");
            errorMessage.innerHTML = "Merci d'écrire votre nom en toutes lettres.";
            orderValidity = false;
            name.appendChild(errorMessage);
        }
    }
    return orderValidity;
}
////// verification du formulaire de prénom /////////:
function checkfirstnameForm(orderValidity) {
    const firstname = document.querySelector(".firstname");
    const input = document.querySelector("#firstname");
    if (input.value === "") {
        const errorMessage = document.createElement("p");
        errorMessage.setAttribute("class", "errorMessage");
        errorMessage.innerHTML = "Merci d'indiquer votre prénom.";
        orderValidity = false;
        firstname.append(errorMessage);
    } else {
        if (alphaRegexe(input.value) === false) {
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "text-error");
            errorMessage.innerHTML = "Merci d'écrire votre prénom en toutes lettres.";
            orderValidity = false;
            firstname.appendChild(errorMessage);
        }
    }
    return orderValidity;
}
///////// Vérification du formulaire d'email /////
function checkEmailForm(orderValidity) {
    const email = document.querySelector(".email");
    const input = document.querySelector("#email");
    if (input.value === "") {
        const errorMessage = document.createElement("p");
        errorMessage.setAttribute("class", "errorMessage");
        errorMessage.innerHTML = "Merci d'indiquer votre email.";
        orderValidity = false;
        email.append(errorMessage);
    } else {
        if (emailRegexe(input.value) === false) {
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "text-error");
            errorMessage.innerHTML = "Merci d'indiquer un email valide.";
            orderValidity = false;
            email.appendChild(errorMessage);
        }
    }
    return orderValidity;
}
////// Vérification du formulaire d'adresse //////
function checkAdresseForm(orderValidity) {
    const adresseError = document.querySelector(".adresse");
    const input = document.querySelector("#adresse");
    if (input.value === "") {
        const errorMessage = document.createElement("p");
        errorMessage.setAttribute("class", "errorMessage");
        errorMessage.innerHTML = "Merci d'indiquer votre adresse.";
        orderValidity = false;
        adresseError.append(errorMessage);
    } else {
        if (adressRegexe(input.value) === false) {
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "text-error");
            errorMessage.innerHTML = "Merci d'écrire une adresse valide.";
            orderValidity = false;
            adresseError.appendChild(errorMessage);
        }
    }
    return orderValidity;
}
///////// Vérification du formulaire de ville //////
function checkCityForm(orderValidity) {
    const cityError = document.querySelector(".city");
    const input = document.querySelector("#city");
    if (input.value === "") {
        const errorMessage = document.createElement("p");
        errorMessage.setAttribute("class", "errorMessage");
        errorMessage.innerHTML = "Merci d'indiquer votre ville.";
        orderValidity = false;
        cityError.append(errorMessage);
    } else {
        if (alphaRegexe(input.value) === false) {
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "text-error");
            errorMessage.innerHTML = "Merci d'écrire votre ville en toutes lettres.";
            orderValidity = false;
            name.appendChild(errorMessage);
        }
    }
    return orderValidity;
}
//////// Vérifictaion des formulaires //////
function checkFormErrors(orderValidity) {
    checkNameForm();
    checkfirstnameForm();
    checkEmailForm();
    checkAdresseForm();
    checkCityForm();

    return orderValidity;
}
//////// bouton de confirmation de commande //////
function succesOrder() {
    const div = document.querySelector(".successOrder");
    btn.setAttribute("style", "display:none");
    const succesOrder = document.createElement("button");
    succesOrder.setAttribute("class", "col btn alert alert-primary mb-5");
    // succesOrder.setAttribute("href", "commande.html");
    succesOrder.setAttribute("role", "alert");
    succesOrder.innerHTML = "<a href= \"commande.html\" class= \"stretched-link\">Confirmaton de votre commande.</a>";
    div.append(succesOrder);
}

function post(url, option) {
    fetch(url, option)
        .then(response => response.json())
        .then(response => {
            localStorage.setItem("orderConfirmation", response.orderId);
            localStorage.setItem("orderNameConfirmation", response.contact.firstName);
            // window.location.href = "commande.html";
        })
        .catch(function (err) {
            console.log(err);
            if (err != 0) {
                alert("Problème de serveur, merci de revenir plus tard.");
            }
        });
}

function sendOrder() {
    const lastName = document.getElementById("name").value;
    const firstName = document.getElementById("firstname").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("adresse").value;
    const city = document.getElementById("city").value;

    const formInformations = new InfoForm(lastName, firstName, email, address, city);

    const basketContent = JSON.parse(localStorage.getItem("basketContent"));

    let idOrders = [];

    for (let i = 0; i < basketContent.length; i++) {
        basketContent[i].id;
        idOrders.push(basketContent[i].id);
    }

    const command = new OrderInfo(formInformations, idOrders);

    const option = {
        method: "POST",
        body: JSON.stringify(command),
        headers: {
            "Content-Type": "application/json"
        }
    }
    // envoi des informations à l'API //
    post("http://localhost:3000/api/cameras/order", option);
}

/////// Message quand le panier est vide //////
function emptyBasketMessage(container) {
    const emptyBasket = document.createElement("div");
    emptyBasket.setAttribute("class", "m-3");
    emptyBasket.textContent = "Votre panier est vide";
    container.appendChild(emptyBasket);
    localStorage.clear();

    return container;
}

function getBasket() {
    fetch("http://localhost:3000/api/cameras/")
        .then(response => response.json())
        .then(response => {
            const basketContent = JSON.parse(localStorage.getItem("basketContent"));
            const basket = document.querySelector(".basket-container");
            if (localStorage.length == 0 || basketContent.length == 0) {
                emptyBasketMessage(basket);
            } else {
                let totalPrice = 0;
                for (let productBasket of basketContent) {
                    for (let productInfo of response) {
                        if (productBasket.id === productInfo._id) {
                            totalPrice = addBasketProduct(
                                productInfo,
                                productBasket,
                                basketContent,
                                totalPrice
                            );
                            localStorage.setItem("totalPriceOrder", totalPrice);
                        }
                    }
                }
                const totalPriceBasket = document.getElementById("total-price");
                totalPriceBasket.setAttribute("class", "h4");
                totalPriceBasket.textContent = "Total : " + totalPrice + " euros";
            }
        })
        .catch((err) => {
            console.log(err);
            alert("Problème de serveur, merci de revenir plus tard.");
        });
    // Envoi du formulaire avec évènement sur le bouton "envoyer" //
    const btn = document.getElementById("btn");
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        let orderValidity = true;
        orderValidity = checkFormErrors(orderValidity);
        // orderValidity = checkNameForm(orderValidity);

        if (orderValidity === true) {
            // confirm("Confirmez-vous l'envoie de votre commande ?");
            succesOrder();
            sendOrder();
        }
    });
}
getBasket();