<template>
    <v-container fluid>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.name" prepend-icon="mdi-account" label="Name" dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.family" prepend-icon="mdi-account-group" label="Family Member" dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.contact" prepend-icon="mdi-phone" label="Contact No." dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.email" prepend-icon="mdi-email" label="Email ID" dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.postal" prepend-icon="mdi-mailbox-open" label="Postal Address" dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-menu
                            ref="dobmenu"
                            v-model="dobmenu"
                            :close-on-content-click="false"
                            :return-value.sync="profile.dob"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="profile.dob"
                                label="Date of Birth"
                                outlined
                                dense
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker v-model="profile.dob" no-title scrollable>
                                <v-spacer></v-spacer>
                                <v-btn text color="primary" @click="dobmenu = false">Cancel</v-btn>
                                <v-btn text color="primary" @click="$refs.dobmenu.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-autocomplete
                    v-model="autocomplete.text"
                    :items="autocomplete.items"
                    :loading="autocomplete.loading"
                    :search-input.sync="search"
                    :color="autocomplete.color"
                    hide-no-data
                    hide-selected
                    @keyup.enter="add"
                    :label="autocomplete.label"
                    :placeholder="autocomplete.placeholder"
                    :prepend-icon="autocomplete.prependIcon"
                    return-object
                ></v-autocomplete>
                <v-divider></v-divider>
                <v-row>
                    <v-col v-for="(product, index) in profile.products" :key="index" cols="12">
                        <v-row>
                            <v-col cols="2">
                                <v-text-field dense :value="product.type" outlined disabled />
                            </v-col>
                            <v-col cols="2">
                                <v-text-field dense label="Brand" outlined v-model="product.brand" />
                            </v-col>
                            <v-col cols="1">
                                <v-text-field dense label="Size" outlined v-model="product.size" />
                            </v-col>
                            <v-col cols="1">
                                <v-text-field dense label="Life" outlined @input="updateCosts(product)" v-model="product.life" />
                            </v-col>
                            <v-col cols="1">
                                <v-text-field dense label="Cost" outlined @input="updateCosts(product)" v-model="product.cost" />
                            </v-col>
                            <v-col cols="2">
                                <v-text-field dense label="Monthly" outlined v-model="product.monthly" disabled />
                            </v-col>
                            <v-col cols="2">
                                <v-text-field dense label="Yearly" outlined v-model="product.yearly" disabled />
                            </v-col>
                            <v-col cols="1">
                                <v-btn color="red" icon @click="remove(index)">
                                    <v-icon>
                                        mdi-delete
                                    </v-icon>
                                </v-btn>
                            </v-col>
                        </v-row>
                    </v-col>
                    <v-col v-if="!profile.products.length" cols="12" class="text-center">
                        Add a product
                    </v-col>
                </v-row>
            </v-card-text>
            <v-card-actions>
                <v-btn :disabled="saving" color="primary" @click="preview">
                    save
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="previewDialog">
            <v-card>
                <v-card-title>Preview</v-card-title>
                <v-card-text>
                    <viewer :id="$data._id" />
                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" @click="save">
                        done
                    </v-btn>
                    <v-btn color="secondary" @click="previewDialog=false">
                        update
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import ProfileService from '~/services/profile.services';
import Viewer from '~/components/Viewer';

export default {
    props: ['id'],
    components: {
        Viewer
    },
    data: () => ({
        _id: null,
        autocomplete: {
            text: null,
            items: [],
            loading: false,
            color: 'white',
            label: 'Product Type',
            placeholder: 'Search for a product...',
            prependIcon: 'mdi-database-search'
        },
        search: '',
        profile: {
            name: null,
            family: null,
            contact: null,
            email: null,
            postal: null,
            dob: null,
            products: [],
        },
        dobmenu: false,
        previewDialog: false,
        profileService: null,
        saving: false
    }),
    methods: {
        verify(type) {
            // verify if the type is allowed.
            return availableProducts.includes(type);
        },
        add() {
            if (this.verify(this.autocomplete.text)) {
                this.profile.products.push({ type: this.autocomplete.text, brand: '', size: '', life: '', cost: '', monthly: '', yearly: '' });
                this.autocomplete.text = null;
                this.autocomplete.items = [];
            }
        },
        remove(index) {
            this.profile.products.splice(index, 1);
        },
        async queryProducts(query) {
            this.autocomplete.loading = true;
            
            // fetch items
            this.autocomplete.items = availableProducts.filter(item => item.includes(query));

            this.autocomplete.loading = false;
        },
        async preview() {
            this.saving = true;
            if (this._id) {
                await this.profileService.update({ id: this.id }, this.profile);
            } else {
                let profile = await this.profileService.create(this.profile);
                this._id = profile.id;
            }
            await this.profileService.save();
            this.previewDialog = true;
            this.saving = false;
        },
        async save() {
            this.$router.push(`/shop/`);
        },
        round(decimal, places) {
            return Math.round(decimal * Math.pow(10, places)) / Math.pow(10, places);
        },
        updateCosts(product) {
            product.monthly = this.round(product.cost/product.life, 2) || 0;
            product.yearly = this.round(12*product.cost/product.life, 2) || 0;
        }
    },
    watch: {
        search(val) {
            val && val !== this.autocomplete.text && this.queryProducts(val);
        }
    },
    async mounted() {
        this._id = this.id;
        this.profileService = new ProfileService();
        if (this.id) {
            this.profile = await this.profileService.findOne({ id: this.id });
        }
    }
}
</script>
