const url = "http://localhost:3000/api/cameras";

/////////////////////////////////////////////////// Ajouter les éléments des produits en HTML/////////////////////////////////
function addProduct(response) {
  const div = document.createElement('div');
  div.className = "col-9 col-md-6 col-lg-4 m-4 mouseover";

  const card = document.createElement('div');
  card.className = "card mb-4 mb-lg-0 shadow";

  const name = document.createElement('h3');
  name.setAttribute("class", "h3 text-center");
  name.textContent = response.name;

  const img = document.createElement('img');
  img.setAttribute("class", "card-img-top");
  img.setAttribute("src", response.imageUrl);

  const description = document.createElement('p');
  description.setAttribute("class", "m-4");
  description.textContent = response.description;

  const lenses = document.createElement('p');
  lenses.setAttribute("class", "ml-4");
  lenses.textContent = "Les optiques : " + response.lenses;

  const price = document.createElement('p');
  price.setAttribute("class", "text-center h4 ml-4");
  price.textContent = "prix : " + response.price/100 + " €";

  const link = document.createElement('a');
  link.setAttribute("class", "stretched-link");
  link.setAttribute("href", "produit.html?id=" + response._id);

  document.querySelector('#product-list').appendChild(div);
  div.appendChild(card);
  card.appendChild(link);
  link.appendChild(img);
  card.appendChild(name);
  card.appendChild(description);
  card.appendChild(lenses);
  card.appendChild(price);
}
//////////////////////////////// Rajouter tous les produits //////////////:
function getAllProducts() {
  fetch(url)
  .then(response => response.json())
  .then(response => {
    for (let i = 0; i < response.length; i++) {
      addProduct(response[i]);
    }
  })
  .catch ((err) => {
    console.log(err);
    alert("Problème de serveur, merci de revenir plus tard.");
  }); 
}

getAllProducts();
 

// get(url)
//   .then(function (response) {
//     // const section = document.querySelector(".row");

// //////////////////////////////////// Ajouter les cartes des appareils photos /////////////
//     for (i = 0; i < response.length; i++) {
//       addProduct(response[i]);
//     }
//   })
//   .catch (function (err){
//     console.log(err);
//     if (err === 0) {
//       // La requète ajax est annulée
//       alert("Problème de serveur, merci de revenir plus tard.")
//     }
//   });




