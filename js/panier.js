function addBasketProduct(
    productInfo,
    productBasket,
    basketContent,
    totalPrice
) {
    const basket = document.querySelector(".basket-container");

    const product = document.createElement("div");
    product.setAttribute("class", "row justify-content-around mb-5");

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

    const btn = document.createElement("button");
    btn.textContent = "Supprimer";
    btn.setAttribute("class", "bg-dark text-light mt-2 suppBtn");
    btn.setAttribute("data-id", productInfo._id);

    const lenses = document.createElement("div");
    lenses.setAttribute("class", "col-4 mt-5");
    lenses.textContent = productBasket.lenses;

    const price = document.createElement("div");
    price.setAttribute("class", "col-4 mt-5");
    price.textContent = productInfo.price / 100 + " euros";
    totalPrice = totalPrice + productInfo.price / 100;

    btn.addEventListener("click", function (e) {
        const id = e.target.getAttribute("data-id");

        for (let i = 0; i != basketContent.length; i++) {
            if (basketContent[i].id === id) {
                basketContent.splice(i, 1);
                break;
            }
        }
        localStorage.setItem("basketContent", JSON.stringify(basketContent));
        window.location.href = "panier.html";
    })

    basket.appendChild(product);
    basket.appendChild(line);
    product.appendChild(divTitle);
    divTitle.appendChild(name);
    divTitle.appendChild(img);
    divTitle.appendChild(btn);
    product.appendChild(lenses);
    product.appendChild(price);

    return totalPrice;
}

function isAlpha(value) {
    return /[a-zA-Z]+/.test(value);
}

function validateEmail(value) {
    if (/^\w+([\.-]?\w+)+@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
        return true;
    }
    return false;
}

function isAdresse(value) {
    return /\w+/.test(value);
}

function checkFormErrors(orderValidity) {
    const error = document.querySelector("#error");
    error.innerHTML = "";
    let inputIds = ["name", "firstname", "email", "adresse", "city"];
    let inputTexts = ["nom", "prénom", "mail", "adresse", "ville"];
    for (let i = 0; i < inputIds.length; i++) {
        const input = document.getElementById(inputIds[i]);
        if (input.value === "") {
            const errorMessage = document.createElement("p");
            errorMessage.setAttribute("class", "errorMessage");
            errorMessage.innerHTML = "Merci d'indiquer votre " + inputTexts[i] + ".";
            orderValidity = false;
            error.appendChild(errorMessage);
        } else {
            if (
                inputIds[i] === "name" ||
                inputIds[i] === "firstname" ||
                inputIds[i] === "city"
            ) {
                if (isAlpha(input.value) === false) {
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-error");
                    errorMessage.innerHTML = "Merci d'écrire votre " + inputTexts[i] + " en toutes lettres.";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
            if (inputIds[i] === "email") {
                if (validateEmail(input.value) === false) {
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-error");
                    errorMessage.innerHTML = "Merci d'écrire un " + inputTexts[i] + " valide.";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
            if (inputIds[i] === "adresse") {
                if (isAdresse(input.value) === false) {
                    const errorMessage = document.createElement("p");
                    errorMessage.setAttribute("class", "text-error");
                    errorMessage.innerHTML = "Merci d'écrire une " + inputTexts[i] + " valide.";
                    orderValidity = false;
                    error.appendChild(errorMessage);
                }
            }
        }
    }
    return orderValidity;
}


function sendOrder() {
    const name = document.getElementById("name").value;
    const firstname = document.getElementById("firstname").value;
    const mail = document.getElementById("email").value;
    const adresse = document.getElementById("adresse").value;
    const city = document.getElementById("city").value;

    const formInformation = new infoForm(name, firstname, mail, adresse, city);

    const basketContent = JSON.parse(localStorage.getItem("basketContent"));

    let idOrder = [];

    for (let i = 0; i < basketContent.length; i++) {
        basketContent[i].id;
        idOrder.push(basketContent[i].id);
        console.log(basketContent[i].id);
    }
    const command = new orderInfo(formInformation, idOrder);
    post("http://localhost:3000/api/cameras/order", command)
        .then(function (response) {
            localStorage.setItem("basketContent", JSON.stringify([]));
            localStorage.setItem("orderConfirmation", response.orderId);
            console.log(response.orderId);
            // window.location.href = "commande.html";
        })
        .catch(function (err) {
            console.log(err);
            if (err === 0) {
                alert("Serveur HS");
            }
        });   

    // fetch("http://localhost:3000/api/cameras/order", {
    //     method: "POST",
    //     body: JSON.stringify(command),
    //     headers: { "Content-type": "application/json" }
    // })
    //     .then(response => {
    //         response.json();
    //         console.log(response);
    //     })
    //     .then(response => {
    //         localStorage.setItem("basketContent", JSON.stringify([]));
    //         localStorage.setItem("orderConfirmation", response.orderId);
            
    //         // window.location.href = "commande.html";
    //     })
    //     .catch ((err) => {
    //     console.log(err);
    //     if (err === 0) {
    //         alert("Problème de serveur, merci de revenir plus tard.");
    //     }
    // });
}

function emptyBasketMessage(container) {
    const emptyBasket = document.createElement("div");
    emptyBasket.setAttribute("class", "m-3");
    emptyBasket.textContent = "Votre panier est vide";
    container.appendChild(emptyBasket);

    return container;
}

function totalPrice() {
    return totalPrice + productInfo.price;
}

fetch("http://localhost:3000/api/cameras/")
    .then(response => response.json())
    .then(response => {

        const basketContent = JSON.parse(localStorage.getItem("basketContent"));
        const basket = document.querySelector(".basket-container");
        if (basketContent.length === 0) {
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
                        localStorage.setItem("totalPriceConfirmationPage", totalPrice);
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

const btn = document.getElementById("btn");

btn.addEventListener("click", function (e) {
    e.preventDefault();
    let orderValidity = true;
    orderValidity = checkFormErrors(orderValidity);

    if (orderValidity === true) {
        confirm("Confirmez-vous l'envoie de votre commande ?");
        sendOrder();
    }

});