<template>
    <v-container fluid>
        <v-card>
            <v-card-title>
                Product Purchase Profiles
            </v-card-title>
            <v-card-text>
                <v-btn @click="$router.push(`/shop/edit/`)" color="primary" v-if="createBtn">
                    <v-icon>
                        mdi-plus
                    </v-icon>
                    create
                </v-btn>
                <v-list>
                    <v-list-item class="grey darken-3" v-for="profile in profiles" :key="profile.id">
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ profile.name }}
                                <v-list-item-subtitle>
                                    {{ profile.createdAt }}
                                </v-list-item-subtitle>
                            </v-list-item-title>
                            <v-row dense>
                                <v-col cols="12">
                                    <v-row>
                                        <v-col v-for="item in ['contact','email','family','postal','dob']" :key="item" cols="6">
                                            {{ capitalize(item) }}: {{ profile[item] }}
                                        </v-col>
                                    </v-row>
                                </v-col>

                                <v-col cols="12">
                                    <v-row dense>
                                        <v-col cols="auto">
                                            <v-btn icon @click="view(profile.id)">
                                                <v-icon>
                                                    mdi-open-in-new
                                                </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn icon @click="edit(profile.id)">
                                                <v-icon>
                                                    mdi-pen
                                                </v-icon>
                                            </v-btn>
                                        </v-col>
                                        <v-col cols="auto">
                                            <v-btn color="red" icon @click="remove(profile.id)">
                                                <v-icon>
                                                    mdi-delete
                                                </v-icon>
                                            </v-btn>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
import { ProfileService } from '~/services/profile.services';

export default {
    props: {
        createBtn: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        view(id) {
            this.$router.push(`/shop/${id}`);
        },
        edit(id) {
            this.$router.push(`/shop/edit/${id}`);
        },
        async remove(id) {
            await this.profileService.deleteOne({ id });
            await this.profileService.save();
            this.profiles = await this.profileService.find();
        },
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
    },
    data: () => ({
        profiles: [],
        profileService: null
    }),
    async mounted() {
        console.log(this.createBtn);
        this.profileService = new ProfileService();
        this.profiles = await this.profileService.find();
    }
}
</script>
