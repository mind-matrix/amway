import { firestore } from "firebase";
import database, { IAlternative, IFirebaseConfig, IProfile } from "./common";
import config from '~/nuxt.config';

let availableProducts: string[] = [
    'Toothpaste',
    'Shampoo',
    'Detergent',
    'Floor Cleaner'
];

const alternatives: { [key: string]: IAlternative } = {
    'Generic': { name: null, size: '', life: 0, cost: 0 },
    'Toothpaste': { name: 'Amway Toothpaste', size: '100gm', life: 4, cost: 20 },
    'Shampoo': { name: 'Amway Shampoo', size: '100gm', life: 3, cost: 35 },
};

export abstract class ProductService {
    abstract getAvailableProducts(): Promise<string[]>;
    abstract setAvailableProducts(products: string[]): Promise<void>;
    abstract getAlternative(type: string): Promise<IProfile>;
    abstract setAlternative(type: string, alt: IAlternative): Promise<void>;
}

export class LocalProductService extends ProductService {
    constructor() {
        super();
    }

    round(decimal: number, places: number) {
        return Math.round(decimal * Math.pow(10, places)) / Math.pow(10, places);
    }

    computeCosts(product: any) {
        product.monthly = this.round(product.cost/product.life, 2) || 0;
        product.yearly = this.round(12*product.cost/product.life, 2) || 0;
        return product;
    }

    async getAvailableProducts() {
        return availableProducts;
    }

    async setAvailableProducts(products: string[]) {
        availableProducts = products;
    }

    async getAlternative(type: string) {
        return this.computeCosts(alternatives[type] || alternatives['Generic']);
    }

    async setAlternative(type: string, alt: any) {
        alternatives[type] = alt;
        return;
    }
}

export class FirebaseProductService extends ProductService {
    db: firestore.Firestore;
    config: IFirebaseConfig;

    constructor(config: IFirebaseConfig = { collection: "products", doc: "PRODUCTS" }) {
        super();
        this.db = database;
        this.config = config;
    }

    round(decimal: number, places: number) {
        return Math.round(decimal * Math.pow(10, places)) / Math.pow(10, places);
    }

    computeCosts(product: any) {
        product.monthly = this.round(product.cost/product.life, 2) || 0;
        product.yearly = this.round(12*product.cost/product.life, 2) || 0;
        return product;
    }

    async getAvailableProducts() {
        let data = (await this.db.collection(this.config.collection).doc(this.config.doc).get()).data();
        return data["available"] || [];
    }

    async setAvailableProducts(products: any) {
        await this.db.collection(this.config.collection).doc(this.config.doc).set({ available: products }, { merge: true });
    }

    async getAlternative(type: string) {
        let data = (await this.db.collection(this.config.collection).doc(this.config.doc).get()).data();
        return data["alternatives"][type] || { 'Generic': { name: null, size: '', life: 0, cost: 0 } };
    }

    async setAlternative(type: any, alt: any) {
        await this.db.collection(this.config.collection).doc(this.config.doc).set({ alternatives: { [type]: alt } }, { merge: true });
        return;
    }
}

const DefaultProductService = (config.dev) ? LocalProductService : FirebaseProductService;

export default DefaultProductService;
