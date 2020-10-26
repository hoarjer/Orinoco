
function addToBasket(selectedLenses) {
    let basketContent = JSON.parse(localStorage.getItem("basketContent"));
    if (basketContent === null) {
        basketContent = [];
    }
    let product = new Product(id, selectedLenses);
    basketContent.push(product);
    console.log(basketContent);
    localStorage.setItem("basketContent", JSON.stringify(basketContent));
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
    title.setAttribute("class", "h3 text-center m-2 pb-3");

    const description = document.createElement("div");
    description.innerHTML = response.description;
    description.setAttribute("class", "mb-2 pb-4");

    const price = document.createElement("p");
    price.textContent = response.price / 100 + " euros";
    price.setAttribute("class", "h4 m-2 pb-2")


    const lenses = document.createElement("select");
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Choix d'une option";
    lenses.appendChild(defaultOption);

    const btn = document.createElement("button");
    btn.textContent = "Ajouter au panier";
    btn.setAttribute("class", "btn btn-dark p-3")
    btn.addEventListener("click", () => {
        const lenses = document.querySelector("select");
        const selectedLenses = lenses.value;

        // rajouter au panier
        alert("ajouter au panier");
        addToBasket(selectedLenses);
    });

    const basketBtn = document.createElement("button");
    basketBtn.textContent = "Voir le panier";
    basketBtn.setAttribute("class", "btn btn-dark p-3 ml-3");
    basketBtn.addEventListener("click", () => {
        window.location.href = "panier.html";
    });

    for (i = 0; i < response.lenses.length; i++) {
        const option = document.createElement("option");
        option.setAttribute("value", response.lenses[i]);
        option.textContent = response.lenses[i];
        lenses.appendChild(option);
    }


    container.appendChild(div);
    div.appendChild(img);
    div.appendChild(title);
    div.appendChild(description);
    div.appendChild(lenses);
    div.appendChild(price);
    div.appendChild(btn);
    div.appendChild(basketBtn);
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
    console.log(id);

    // récupérer la réponse 
    fetch("http://localhost:3000/api/cameras/" + id)
        .then(response => response.json())
        .then(response => {

            addProductInfo(response);
        })
        .catch((err) => {
            console.log(err);
            alert("Problème de serveur, merci de revenir plus tard.");
        });

}
getProduct();

