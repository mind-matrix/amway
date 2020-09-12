import firebase from '~/plugins/firestore.client';

export interface IAlternative {
    name: string;
    size: string;
    life: number;
    cost: number;
};

export interface IProfile {
    id?: string;
    type: string;
    brand: string;
    size: string;
    life: number;
    cost: number;
    monthly: number;
    yearly: number;
    alt?: IAlternative;
    createdAt?: Date | string;
    updatedAt?: Date | string; 
};

export interface IFirebaseConfig {
    collection: string;
    doc?: string;
};

export default firebase.firestore();


