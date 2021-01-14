<template>
  <reports-table
    v-if="$store.getters.reportsReady && authorized"
    class="my-4"
    :reports="$store.getters.unverifiedReports"
    />
    <v-row
      align="center"
      justify="center"
      width="100%"
      height="100%"
      v-else-if="$store.getters.authReady"
      >
      <v-sheet 
        class="mx-auto my-auto text-center pa-13"
        elevation="5"
        >
        <div class="text-h5 ma-5">You must be a moderator to manage reports!</div>
        <v-btn @click="$router.push('/')">Home</v-btn>
      </v-sheet>
    </v-row>
</template>
<script>
import ReportsTable from '~/ReportsTable';

export default {
  name: 'Reports',
  props: {
    title: String,
  },
  mounted() {
    document.title = 'Active Reports';
    this.$emit('child-init', this.title);

    this.$store.dispatch('refreshAuth');
    this.$store.dispatch('fetchReports');
  },
  computed: {
    authorized() {
      return this.$store.getters.myAuthLevel >= 2;
    },
  },
  components: {
    ReportsTable,
  },
};
</script>
<style lang="scss" scoped>

@use '~@/common';

</style>
