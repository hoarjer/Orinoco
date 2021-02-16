/////////////////////////////////////////////////// Ajouter les éléments des produits en HTML/////////////////////////////////
function addProduct(response) {
  const div = document.createElement("div");
  div.className = "col-9 col-md-6 col-lg-4 m-4 mouseover";

  const card = document.createElement("div");
  card.className = "card mb-4 mb-lg-0 shadow";

  const name = document.createElement("h3");
  name.setAttribute("class", "text-center");
  name.textContent = response.name;

  const img = document.createElement("img");
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", response.imageUrl);

  const description = document.createElement("p");
  description.setAttribute("class", "m-4");
  description.textContent = response.description;

  const lenses = document.createElement("p");
  lenses.setAttribute("class", "ml-4");
  lenses.textContent = "Les optiques : " + response.lenses;

  const price = document.createElement("p");
  price.setAttribute("class", "text-center h4 ml-4");
  price.textContent = "prix : " + response.price / 100 + " €";

  const link = document.createElement("a");
  link.setAttribute("class", "stretched-link");
  link.setAttribute("href", "produit.html?id=" + response._id);

  document.querySelector("#product-list").appendChild(div);
  div.append(card);
  card.append(link);
  card.append(img);
  card.append(name);
  card.append(description);
  card.append(lenses);
  card.append(price);
}

// Ajouter le nombre d'article du panier //
function basketContentNav() {
  if (localStorage.length != 0) {
    const basketContent = JSON.parse(localStorage.getItem("basketContent"));
    const basketNavlink = document.querySelector(".basket");
    basketNavlink.textContent = "Panier(" + basketContent.length + ")";
  }
}

//////////////////////////////// Rajouter tous les produits //////////////:
function addAllProducts() {
  fetch("http://localhost:3000/api/cameras")
    .then(response => response.json())
    .then(response => {
      for (let i = 0; i < response.length; i++) {
        addProduct(response[i]);
        basketContentNav();
      }
    })
    .catch((err) => {
      console.log(err);
      alert("Problème de serveur, merci de revenir plus tard.");
    });
}

addAllProducts();