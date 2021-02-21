<template>
  <div>
    <records-table v-if="level && level.times" :level="level" />
    <v-progress-circular v-else indeterminate class="absolute-center"/>
  </div>
</template>

<script>
import RecordsTable from '~/RecordsTable';

import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
  name: 'LevelPage',
  data: () => ({

  }),
  props: {
    title: String,
  },
  created() {
    this.$store.dispatch('refreshAuth');
    this.$store.dispatch('fetchLevel', { id: this.$route.params.id });
    this.$store.dispatch('fetchTimesOfLevel', { id: this.$route.params.id });

    this.$emit('child-init', this.title);

    if (isNaN(this.$route.params.id)) {
      this.$router.push('/404');
    }
  },
  computed: {
    ...mapGetters([
      'allTimes',
    ]),
    filteredTimes() {
      return this.level;
    },
    level() {
      return this.$store.getters.level(this.$route.params.id);
    },
  },
  components: {
    RecordsTable,
  },
}
</script>

<style lang="scss" scoped>

@use '~@/common';

.absolute-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
