<template>
<div>
  <v-tooltip top v-if="time.verified">
    <template v-slot:activator="{ on }">
      <v-icon v-on="on">mdi-check</v-icon>
    </template>
    <span>time verified!</span>
  </v-tooltip>
  <v-tooltip top v-else-if="!time.verified && authorized">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" icon @click="promptReason(time.id)">
        <v-icon>mdi-alert</v-icon>
      </v-btn>
    </template>
    <span>report level time</span>
  </v-tooltip>
  <v-tooltip v-else top>
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <v-btn icon 
           v-on="on"
           disabled
           >
           <v-icon>mdi-alert</v-icon>
        </v-btn>
      </div>
    </template>
    <span>login to report times</span>
  </v-tooltip>
  <report-overlay
    :visible="overlay"
    v-model="reason"
    @close="closeOverlay"
    @report="report()"
  />
</div>
</template>
<script>
import ReportOverlay from './ReportOverlay';

import escape from '../mixins/escape';

export default {
  name: 'SmallReportButton',
  data: () => ({
    overlay: false,
    reason: "",
  }),
  props: {
    time: Object,
  },
  mixins: [escape],
  computed: {
    authorized() {
      let rdy = this.$store.getters.authReady;
      let status = this.$store.getters.myAuthLevel;
      return rdy && (status > 0);
    },
  },
  methods: {
    escape() {
      this.closeOverlay();
    },
    cannotReport() {
      this.$snotify.warning('Time is already verified!', 'Cannot report time.')
    },
    report() {
      this.$store.dispatch('report', { time: this.time.id, reason: this.reason });
      this.overlay = false;
      this.reason = "";
    },
    promptReason(time_id) {
      this.overlay = true;
    },
    closeOverlay() {
      this.overlay = false;
      this.reason = ""
    },
  },
  components: {
    ReportOverlay,
  }
};
</script>
<style lang="scss" scoped>

</style>
