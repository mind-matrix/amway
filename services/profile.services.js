import _ from 'lodash';
import uniqid from 'uniqid';

export class ProfileService {

    constructor() {
        let data = localStorage.getItem("profiles");
        if (data)
            this.profiles = _.mapValues(JSON.parse(data), function (obj) {
                obj.createdAt = new Date(obj.createdAt);
                obj.updatedAt = new Date(obj.updatedAt);
                return obj;
            });
        else
            this.profiles = {};
    }

    /**
     * Save current changes to persistent storage
     * @returns {object}
     */
    async save() {
        localStorage.setItem("profiles", JSON.stringify(this.profiles));
        return this.profiles;
    }

    /**
     * Finds all elements matching filters
     * @param {object} filter
     * @returns {object[]}
     */
    async find(filter) {

        return _.filter(_.values(this.profiles), filter);
    }

    /**
     * Finds one element matching filters
     * @param {object} filter
     * @returns {object} 
     */
    async findOne(filter) {
        if (filter.id && _.keys(filter).length === 1)
            return this.profiles[filter.id];
        return _.find(_.values(this.profiles), filter)[0];
    }

    /**
     * Creates a new entity instance;
     * @param {object} profile
     * @returns {object}
     */
    async create(profile) {
        if(!profile.id)
            profile.id = uniqid();
        profile.createdAt = new Date();
        profile.updatedAt = new Date();
        this.profiles[profile.id] = profile;
        return profile;
    }

    /**
     * Updates all entity instances matching filters
     * @param {object} filter 
     * @param {object} data
     * @returns {object[]} 
     */
    async update(filter, data) {
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
     * Updates one entity instance matching filters
     * @param {object} filter 
     * @param {object} data
     * @returns {object}
     */
    async updateOne(filter, data) {
        if (data['id'])
            delete data['id'];
        let selectedProfile = await this.findOne(filter);
        selectedProfile = _.merge(selectedProfile, data);
        this.profiles[selectedProfile.id] = selectedProfile;
        return selectedProfile;
    }

    /**
     * Deletes all entity instances matching filters
     * @param {object} filter
     * @returns {object[]} 
     */
    async delete(filter) {
        let selectedProfiles = await this.find(filter);
        for(let profile of selectedProfiles) {
            delete this.profiles[profile.id];
        }
        return selectedProfiles;
    }

    /**
     * Deletes one entity instance matching filters
     * @param {object} filter
     * @returns {object}
     */
    async deleteOne(filter) {
        let selectedProfile = await this.findOne(filter);
        console.log(selectedProfile);
        delete this.profiles[selectedProfile.id];
        return selectedProfile;
    }

}