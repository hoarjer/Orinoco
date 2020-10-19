// class Camera {
//     constructor(name, imageUrl, description, lenses, _id, price) {
//         this.name = name;
//         this.img = imageUrl;
//         this.description = description;
//         this.lenses = lenses;
//         this.id = _id;
//         this.price = price;
//     }
// }

class Product {
    constructor(id, selectedLenses) {
        this.lenses = selectedLenses; 
        this.id = id;
    }
}