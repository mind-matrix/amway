<template>
    <editor :id="$route.params.id" />
</template>

<script>
import Editor from '~/components/Editor';

export default {
    components: {
        Editor
    }
}
</script>
