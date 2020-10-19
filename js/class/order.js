class infoForm {
    constructor(name, firstname, mail, adresse, city) {
        this.name = name;
        this.firstname = firstname;
        this.mail = mail;
        this.adresse = adresse;
        this.city = city;
    }
}

class orderInfo {
    constructor(infoForm, idOrder) {
        this.infoForm = infoForm;
        this.idOrder = idOrder;
    }
}

class Basket {
    constructor(name, lense, price, totalPrice) {
        this.name = name;
        this.lense = lense;
        this.price = price;
        this.totalPrice = totalPrice;
    }
}