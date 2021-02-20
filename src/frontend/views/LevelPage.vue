<template>
  <div>
    <records-table :times="filteredTimes" :level="level" />
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
    this.$store.dispatch('fetchTimes');

    this.$store.dispatch('fetchLevel', { id: this.$route.params.id });

    this.$emit('child-init', this.title);

    if (isNaN(this.$route.params.id)) {
      this.$router.push('/404');
    }
  },
  methods: {
    levelTimesBest(duration) {
      let levelTimes = this.allTimes.filter(v => v.level.id === parseInt(this.$route.params.id));
      levelTimes.sort((a, b) => a.duration < b.duration);
      return levelTimes;
    },
    levelTimesRecent(duration) {

    },
  },
  computed: {
    ...mapGetters([
      'allTimes',
    ]),
    filteredTimes() {
      return this.levelTimesBest();
    },
    level() {
      return this.$store.getters.level(this.$route.params.id);
    },
  },
  components: {
    RecordsTable
  }
}
</script>

<style lang="scss" scoped>

</style>
