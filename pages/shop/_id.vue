<template>
    <viewer :id="$route.params.id" />
</template>

<script>
import Viewer from '~/components/Viewer';

export default {
    components: {
        Viewer
    }
}
</script>