<template>
<span>
  <span v-show="time.verified">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-icon v-on="on">mdi-check</v-icon>
      </template>
      <span>time verified!</span>
    </v-tooltip>
  </span>
  <span v-show="!time.verified && authorized">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          @mousedown.stop
          @mouseover.stop
          v-on="on"
          icon
          @click.stop="promptReason(time.id)"
        >
          <v-icon>mdi-alert</v-icon>
        </v-btn>
      </template>
      <span>report level time</span>
    </v-tooltip>
  </span>
  <span v-show="!time.verified && !authorized">
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <div v-on="on" class="d-inline-block">
          <v-btn
            icon 
            disabled
          >
            <v-icon>mdi-alert</v-icon>
          </v-btn>
        </div>
      </template>
      <span>login to report times</span>
    </v-tooltip>
  </span>
  <report-overlay
    :visible="overlay"
    v-model="reason"
    @close="closeOverlay"
    @report="report()"
  />
</span>
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
  },
};
</script>
<style lang="scss" scoped>

@use '~@/common';

</style>
