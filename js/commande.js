function addOrderElements() {
///////////// Récupération des données du localStorage ////////
    const orderConfirmation = localStorage.getItem("orderConfirmation");
    const name = localStorage.getItem("orderNameConfirmation");
    const totalPrice = localStorage.getItem("totalPriceOrder");

//////////// Sélection de la div où vont apparaître les info //////
    const orderContainer = document.querySelector(".order-container");
    orderContainer.setAttribute("class", "justify-content-center order-container mt-2 mb-5 p-2");

/////////// Création des éléments //////////
    const orderName = document.createElement("p");
    orderName.setAttribute("class", "h1 mt-1 mb-5 text-center");
    orderName.textContent = name + " , votre commande";

    const orderNum = document.createElement("p");
    orderNum.setAttribute("class", "text-center p-2 order shadow");
    orderNum.textContent = orderConfirmation;

    const orderCommandText = document.createElement("p");
    orderCommandText.setAttribute("class", "mt-3 mb-5 text-center h4");
    orderCommandText.innerHTML = " a bien été enregistrée ! <hr>";

    const orderPriceText = document.createElement("p");
    orderPriceText.setAttribute("class", "mt-3 mb-3 text-center h4");
    orderPriceText.textContent = "Le total de votre commande est de : ";

    const orderPrice = document.createElement("p");
    orderPrice.setAttribute("class", "h3 p-2 price text-center shadow");
    orderPrice.textContent = totalPrice + " €";

    const thanks = document.createElement("p");
    thanks.setAttribute("class", "m-2 p-4 text-center");
    thanks.textContent = "Merci d'avoir passé commande chez Orinoco !";

    const backHome = document.createElement("button");
    backHome.innerHTML = "<span>Retourner à la page d'accueil </span>";
    backHome.setAttribute("class", "btn-dark text-light mb-1 backHome shadow button")
    backHome.addEventListener("click", function(e) {
        window.location.href = "index.html";
    })

    // suppression du local storage //
    localStorage.clear();
    
///////// Arborescence ///////////
    orderContainer.append(orderName);
    orderContainer.appendChild(orderNum);
    orderContainer.append(orderCommandText);
    orderContainer.append(orderPriceText);
    orderContainer.append(orderPrice);
    orderContainer.append(thanks);
    orderContainer.append(backHome);

}
////// Affichage des infos dans les élémenst html //////
addOrderElements();
