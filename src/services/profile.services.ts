import _ from 'lodash';
import uniqid from 'uniqid';
import { firestore } from 'firebase';
import { IFirebaseConfig, IProfile } from './common';

export abstract class ProfileService {
    abstract save(): void;
    abstract find(filter: any): Promise<IProfile[] | any>;
    abstract findOne(filter: any): Promise<IProfile | any>;
    abstract create(data: IProfile): Promise<IProfile | any>;
    abstract update(filter: any, data: any): Promise<IProfile[] | any>;
    abstract updateOne(filter: any, data: any): Promise<IProfile | any>;
    abstract delete(filter: any): Promise<IProfile[] | any>;
    abstract deleteOne(filter: any): Promise<IProfile | any>;
};

export class LocalProfileService extends ProfileService {

    profiles: { [id: string]: IProfile };

    constructor() {
        super();
        let data = localStorage.getItem("profiles");
        if (data)
            this.profiles = _.mapValues(JSON.parse(data), function (obj: any) {
                obj.createdAt = new Date(obj.createdAt);
                obj.updatedAt = new Date(obj.updatedAt);
                return obj;
            });
        else
            this.profiles = {};
    }

    /**
     * Save current changes to persistent storage.
     */
    async save() {
        localStorage.setItem("profiles", JSON.stringify(this.profiles));
        return;
    }

    /**
     * Finds all elements matching filters.
     */
    async find(filter: any) {
        return _.filter(_.values(this.profiles), filter);
    }

    /**
     * Finds one element matching filters.
     */
    async findOne(filter: any) {
        if (filter.id && _.keys(filter).length === 1)
            return this.profiles[filter.id];
        return _.find(_.values(this.profiles), filter);
    }

    /**
     * Creates a new entity instance.
     */
    async create(profile: IProfile) {
        if(!profile.id)
            profile.id = uniqid();
        profile.createdAt = new Date();
        profile.updatedAt = new Date();
        this.profiles[profile.id] = profile;
        return profile;
    }

    /**
     * Updates all entity instances matching filters.
     */
    async update(filter: any, data: any) {
        if (data['id'])
            delete data['id'];
        let selectedProfiles = await this.find(filter);
        for(let profile of selectedProfiles) {
            data['id'] = profile.id;
            profile = _.merge(profile, data);
            profile.updatedAt = new Date();
            this.profiles[profile.id] = profile;
        }
        return selectedProfiles;
    }

    /**
     * Updates one entity instance matching filters.
     */
    async updateOne(filter: any, data: any) {
        if (data['id'])
            delete data['id'];
        let selectedProfile = await this.findOne(filter);
        selectedProfile = _.merge(selectedProfile, data);
        this.profiles[selectedProfile.id] = selectedProfile;
        return selectedProfile;
    }

    /**
     * Deletes all entity instances matching filters.
     */
    async delete(filter: any) {
        let selectedProfiles = await this.find(filter);
        for(let profile of selectedProfiles) {
            delete this.profiles[profile.id];
        }
        return selectedProfiles;
    }

    /**
     * Deletes one entity instance matching filters.
     */
    async deleteOne(filter: any) {
        let selectedProfile = await this.findOne(filter);
        console.log(selectedProfile);
        delete this.profiles[selectedProfile.id];
        return selectedProfile;
    }

}

export class FirebaseProfileService extends ProfileService {

    db: firestore.Firestore;
    config: IFirebaseConfig;

    constructor(public database: firestore.Firestore, config: IFirebaseConfig = { collection: "profiles" }) {
        super();
        this.db = database;
        this.config = config;
    }

    /**
     * Save current changes to persistent storage.
     * Firestore changes are handled by client library so no modifications here.
     */
    async save() {
        return;
    }

    /**
     * Finds all elements matching filters.
     */
    async find(filter: any) {
        let snapshot = await this.db.collection(this.config.collection).get();
        if (snapshot.empty)
            return [];
        let profiles: IProfile[] = [];
        snapshot.forEach(doc => profiles.push(<IProfile> doc.data()));
        return _.filter(profiles, filter);
    }

    /**
     * Finds one element matching filters.
     */
    async findOne(filter: any) {
        if (filter.id && _.keys(filter).length === 1)
            return await (await this.db.collection(this.config.collection).doc(filter.id).get()).data();
        let profiles = await this.find(filter);
        let profile = profiles.find(profile => _.isMatch(profile, filter));
        return <IProfile>profile;
    }

    /**
     * Creates a new entity instance.
     */
    async create(profile: IProfile) {
        if(!profile.id)
            profile.id = uniqid();
        profile.createdAt = new Date();
        profile.updatedAt = new Date();
        await this.db.collection(this.config.collection).doc(profile.id).set(profile);
        return profile;
    }

    /**
     * Updates all entity instances matching filters.
     */
    async update(filter: any, data: any) {
        let selectedProfiles = await this.find(filter);
        for(let profile of selectedProfiles) {
            data['id'] = profile.id;
            profile = _.merge(profile, data);
            profile.updatedAt = new Date();
            await this.db.collection(this.config.collection).doc(profile.id).set(data);
        }
        return selectedProfiles;
    }

    /**
     * Updates one entity instance matching filters.
     */
    async updateOne(filter: any, data: any) {
        if (data['id'])
            delete data['id'];
        let selectedProfile = await this.findOne(filter);
        selectedProfile = _.merge(selectedProfile, data);
        await this.db.collection(this.config.collection).doc(selectedProfile.id).set(selectedProfile);
        return <IProfile>selectedProfile;
    }

    /**
     * Deletes all entity instances matching filters.
     */
    async delete(filter: any) {
        let selectedProfiles = await this.find(filter);
        for(let profile of selectedProfiles) {
            await this.db.collection(this.config.collection).doc(profile.id).delete();
        }
        return selectedProfiles;
    }

    /**
     * Deletes one entity instance matching filters.
     */
    async deleteOne(filter: any) {
        let selectedProfile = await this.findOne(filter);
        console.log(selectedProfile);
        await this.db.collection(this.config.collection).doc(selectedProfile.id).delete();
        return <IProfile>selectedProfile;
    }

}

const DefaultService = (process.env.MODE !== "production") ? LocalProfileService : FirebaseProfileService

export default DefaultService;