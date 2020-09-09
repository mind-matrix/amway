
const alternatives = {
    'Generic': { name: null, size: '', life: 0, cost: 0 },
    'Toothpaste': { name: 'Amway Toothpaste', size: '100gm', life: 4, cost: 20 },
    'Shampoo': { name: 'Amway Shampoo', size: '100gm', life: 3, cost: 35 },
}

export class ProductService {
    constructor() { }

    round(decimal, places) {
        return Math.round(decimal * Math.pow(10, places)) / Math.pow(10, places);
    }

    computeCosts(product) {
        product.monthly = this.round(product.cost/product.life, 2) || 0;
        product.yearly = this.round(12*product.cost/product.life, 2) || 0;
        return product;
    }

    getAlternative(type) {
        return this.computeCosts(alternatives[type] || alternatives['Generic']);
    }
}
