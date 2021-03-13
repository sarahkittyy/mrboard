<template>
    <level-browser v-if="levels && this.$store.getters.timesReady" :levels="levels"/>
    <v-progress-circular v-else indeterminate class="absolute-center"/>
</template>
<script>
import { mapGetters } from 'vuex';

import LevelBrowser from '~/LevelBrowser';

export default {
  name: 'LevelSearch',
  props: {
    title: String,
  },
  components: {
    LevelBrowser,
  },
  mounted() {
    this.$store.dispatch('fetchLevels');
    this.$store.dispatch('fetchTimes');
    this.$store.dispatch('refreshAuth');

    this.$emit('child-init', this.title);
  },
  computed: {
    levels() {
      return Object.values(this.$store.getters.levels);
    }
  },
};
</script>
<style lang="scss" scoped>

@use '~@/common';

</style>
