<template>
    <v-container fluid>
        <v-card width="100%">
            <v-card-title>
                Product Purchase Profile
            </v-card-title>
            <v-card-text>
                <template v-if="profile">
                    <div>
                        <v-row>
                            <v-col cols="12" md="6">
                                Name: {{ profile.name }}
                            </v-col>
                            <v-col cols="12" md="6">
                                Family Member: {{ profile.family }}
                            </v-col>
                            <v-col cols="12" md="6">
                                Contact No.: {{ profile.contact }}
                            </v-col>
                            <v-col cols="12" md="6">
                                Email ID: {{ profile.email }}
                            </v-col>
                            <v-col cols="12" md="12">
                                Postal Address: {{ profile.postal }}
                            </v-col>
                            <v-col cols="12" md="6">
                                Date of Birth: {{ profile.dob }}
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12">
                                <v-simple-table fixed-header height="300px">
                                    <template v-slot:default>
                                        <thead>
                                            <tr>
                                                <th colspan="3"></th>
                                                <th colspan="1">Life</th>
                                                <th colspan="1">Cost</th>
                                                <th colspan="2" scope="colgroup">Effective Cost</th>
                                                <th colspan="2"></th>
                                                <th colspan="1">Life</th>
                                                <th colspan="1">Cost</th>
                                                <th colspan="2" scope="colgroup">Effective Cost</th>
                                            </tr>
                                            <tr>
                                                <th class="text-left">Type of Product</th>
                                                <th class="text-left">Brand</th>
                                                <th class="text-left">Size</th>
                                                <th class="text-left">(Months)</th>
                                                <th class="text-left">DAP (Rs.)</th>
                                                <th class="text-left">Monthly</th>
                                                <th class="text-left">Yearly</th>

                                                <th class="text-left">AMWAY</th>
                                                <th class="text-left">Size</th>
                                                <th class="text-left">(Months)</th>
                                                <th class="text-left">DAP (Rs.)</th>
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

                                                <td>{{ product.alt.name }}</td>
                                                <td>{{ product.alt.size }}</td>
                                                <td>{{ product.alt.life }}</td>
                                                <td>{{ product.alt.cost }}</td>
                                                <td>{{ product.alt.monthly }}</td>
                                                <td>{{ product.alt.yearly }}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="6">Total</td>
                                                <td>{{ sum(profile.products, 'yearly') }}</td>
                                                
                                                <td colspan="5">Total</td>
                                                <td>{{ sum(profile.products, 'yearly', true) }}</td>
                                            </tr>
                                            <tr>
                                                <td colspan="12">Yearly Savings</td>
                                                <td>{{ sum(profile.products, 'yearly') - sum(profile.products, 'yearly', true) }}</td>
                                            </tr>
                                        </tbody>
                                    </template>
                                </v-simple-table>
                            </v-col>
                        </v-row>
                    </div>
                </template>
                <template v-else>
                    <div class="text-center">
                        <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                        ></v-progress-circular>
                    </div>
                </template>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { ProfileService } from '~/services/profile.services';
import { ProductService } from '~/services/product.services';

export default {
    props: ['id'],
    data: () => ({
        profile: null,
        profileService: null,
        productService: null
    }),
    methods: {
        sum(products, key, alt = false) {
            if (alt)
                return products.map(product => product.alt).reduce((a, v) => a + v[key], 0);
            return products.reduce((a,v) => a + v[key], 0);
        }
    },
    async mounted() {
        this.profileService = new ProfileService();
        this.productService = new ProductService();
        let profile = await this.profileService.findOne({ id: this.id });
        for (let product of profile.products) {
            product.alt = this.productService.getAlternative(product.type);
        }
        this.profile = profile;
    }
}
</script>
