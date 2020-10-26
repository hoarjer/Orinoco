class InfoForm {
    constructor(lastName, firstName, email, address, city) {
        this.lastName = lastName;
        this.firstName = firstName;
        this.email = email;
        this.address = address;
        this.city = city;
    }
}

class OrderInfo {
    constructor(infoForm, idOrders) {
        this.contact = infoForm;
        this.products = idOrders;
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