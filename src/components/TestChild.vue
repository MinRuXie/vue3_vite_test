<template>

    <h1>{{ title }}</h1>

</template>

<script>
import { defineComponent } from 'vue';
import { defineModel } from '@vue/composition-api';

export default defineComponent({
  setup() {
    const title = defineModel('title');
    return { title };
  }
});
</script>