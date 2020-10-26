function addOrderElements() {
///////////// Récupération des données du localStorage ////////
    let orderConfirmation = localStorage.getItem("orderConfirmation");
    let name = localStorage.getItem("orderNameConfirmation");
    let totalPrice = localStorage.getItem("totalPriceOrder");

//////////// Sélection de la div où vont apparaître les info //////
    let orderContainer = document.querySelector(".order-container");
    orderContainer.setAttribute("class", "justify-content-center order-container mt-2 mb-5 p-2");

/////////// Création des éléments //////////
    let orderName = document.createElement("p");
    orderName.setAttribute("class", "h1 mt-1 mb-5 text-center");
    orderName.textContent = name + " , votre commande : ";

    let orderNum = document.createElement("p");
    orderNum.setAttribute("class", "text-center p-2 order shadow");
    orderNum.textContent = orderConfirmation;

    let orderCommandText = document.createElement("p");
    orderCommandText.setAttribute("class", "mt-3 mb-5 text-center h4");
    orderCommandText.innerHTML = " a bien été enregistrée ! <hr>";

    let orderPriceText = document.createElement("p");
    orderPriceText.setAttribute("class", "mt-3 mb-3 text-center h4");
    orderPriceText.textContent = "Le total de votre commande est de : ";

    let orderPrice = document.createElement("p");
    orderPrice.setAttribute("class", "h3 p-2 price text-center shadow");
    orderPrice.textContent = totalPrice + " €";

    let thanks = document.createElement("p");
    thanks.setAttribute("class", "m-2 p-4 text-center");
    thanks.textContent = "Merci d'avoir passer commande chez Orinoco !";

    let backHome = document.createElement("button");
    backHome.textContent = "Retourner à la page d'accueil";
    backHome.setAttribute("class", "btn-dark text-light mb-1 backHome shadow")

    //////// LocalStorage effacer au retour à la homePage /////
    backHome.addEventListener("click", function (e) {
        window.location.href = "index.html";
        localStorage.clear();
    })

    let homePage = document.querySelector(".navbar-brand");
    homePage.addEventListener("click", function(e) {
        localStorage.clear();
    })

    let navHomePage = document.querySelector("#homePage");
    navHomePage.addEventListener("click", function(e) {
        localStorage.clear();
    })
    
///////// Arborescence ///////////
    orderContainer.append(orderName);
    orderContainer.appendChild(orderNum);
    orderContainer.append(orderCommandText);
    orderContainer.append(orderPriceText);
    orderContainer.append(orderPrice);
    orderContainer.append(thanks);
    orderContainer.append(backHome);

}

addOrderElements();
