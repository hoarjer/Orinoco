class infoForm {
    constructor(name, firstname, mail, adresse, city) {
        this.name = name;
        this.firstname = firstname;
        this.mail = mail;
        this.adress = adresse;
        this.city = city;
    }
}

class orderInfo extends infoForm {
    constructor(idOrder) {
        super();
        this.id = idOrder;
    }
}

class Basket {
    constructor(name, lense, price, totalPrice) {
        this.name = name;
        this.lense = lense;
        this.price = price;
        this.totalPrice = totalPrice;
    }
    totalPriceCalc() {
        this.totalPrice + this.price;
        console.log(totalPrice);
    }
}