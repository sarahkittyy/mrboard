<template>
  <records-table v-if="level" :level="level" />
  <v-progress-circular v-else-if="loading" indeterminate class="absolute-center"/>
  <v-container v-else fill-height fluid>
    <v-row align="center" justify="center">
      <v-card elevation="5" width="50%" class="text-center pa-13">
        <div class="text-h5 ma-5">Could not find specified level.</div>
        <v-btn @click="$router.push('/')">Home</v-btn>
        <v-btn class="ml-4" @click="$router.push('/levels')">Levels</v-btn>
      </v-card>
    </v-row>
  </v-container>
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
    steam: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$store.dispatch('refreshAuth');
    if (!this.steam) {
      this.$store.dispatch('fetchLevel', { id: this.$route.params.id });
    } else {
      this.$store.dispatch('fetchLevelBySteam', { id: this.$route.params.id });
    }
    this.$store.dispatch('fetchTimes');

    this.$emit('child-init', this.title);

    if (isNaN(this.id)) {
      this.$router.push('/404');
    }
  },
  computed: {
    ...mapGetters([
      'allTimes',
    ]),
    level() {
      return this.$store.getters.level(this.id);
    },
    id() {
      if (!this.steam) {
        return this.$route.params.id;
      } else {
        return this.$store.getters.idFromSteam(this.$route.params.id);
      }
    },
    loading() {
      return this.$store.getters.levelsLoading;
    }
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
