<template>
    <v-container fluid>
        <viewer :id="$route.params.id" />
    </v-container>
</template>

<script>
import Viewer from '~/components/Viewer';

export default {
    components: {
        Viewer
    }
}
</script>