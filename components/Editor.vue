<template>
    <v-container fluid>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.name" label="Name" dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.family" label="Family Member" dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.contact" label="Contact No." dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.email" label="Email ID" dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.postal" label="Postal Address" dense outlined />
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-text-field v-model="profile.dob" label="Date of Birth" dense outlined />
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
                <v-btn color="primary" @click="preview">
                    save
                </v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="previewDialog">
            <v-card>
                <v-card-title>Preview</v-card-title>
                <v-card-text>
                    <v-simple-table fixed-header height="300px">
                        <template v-slot:default>
                            <thead>
                                <tr>
                                    <th colspan="5"></th>
                                    <th colspan="2" scope="colgroup">Effective Cost</th>
                                </tr>
                                <tr>
                                    <th class="text-left">Product Type</th>
                                    <th class="text-left">Brand</th>
                                    <th class="text-left">Size</th>
                                    <th class="text-left">Life</th>
                                    <th class="text-left">Cost</th>
                                    <th class="text-left">Monthly</th>
                                    <th class="text-left">Yearly</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(product, index) in profile.products" :key="index">
                                    <td>{{ product.type }}</td>
                                    <td>{{ product.brand }}</td>
                                    <td>{{ product.size }}</td>
                                    <td>{{ product.life }}</td>
                                    <td>{{ product.cost }}</td>
                                    <td>{{ product.monthly }}</td>
                                    <td>{{ product.yearly }}</td>
                                </tr>
                            </tbody>
                        </template>
                    </v-simple-table>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn :disabled="saving" color="primary" @click="save().then(() => { previewDialog = false })">
                        {{ saving ? 'saving...' : 'save' }}
                    </v-btn>
                    <v-btn :disabled="saving" color="secondary" @click="previewDialog = false">
                        cancel
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
import { ProfileService } from '~/services/profile.services';

const availableProducts = [
    'Toothpaste',
    'Shampoo',
    'Detergent',
    'Floor Cleaner'
];

export default {
    props: ['id'],
    data: () => ({
        autocomplete: {
            text: null,
            items: [],
            loading: false,
            color: 'white',
            label: 'Product Type',
            placeholder: 'Search for a product...',
            prependIcon: 'mdi-database-search'
        },
        search: null,
        profile: {
            name: null,
            family: null,
            contact: null,
            email: null,
            postal: null,
            dob: null,
            products: [],
        },
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
                this.autocomplete.text = '';
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
        preview() {
            this.previewDialog = true;
        },
        async save() {
            this.saving = true;
            if (this.id) {
                await this.profileService.update({ id: this.id }, this.profile);
            } else {
                await this.profileService.create(this.profile);
            }
            await this.profileService.save();
            this.saving = false;
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
        this.profileService = new ProfileService();
        if (this.id) {
            this.profile = await this.profileService.findOne({ id: this.id });
        }
    }
}
</script>
