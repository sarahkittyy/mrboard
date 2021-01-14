<template>
  <div class="ma-4">
    <template v-if="level != null">
      <v-data-table
        :items="times"
        :headers="headers"
        class="my-2"
        >
        <template v-slot:top>
          <v-toolbar color="primary">
            <v-toolbar-title>
              {{ level.name }}	
              <span v-if="level.campaign">-- {{ level.campaign }}</span> 
            </v-toolbar-title>
            <v-spacer />
              <v-toolbar-items>
                <v-btn text @click="toLevelSteamPage">
                  <v-icon class="mr-2">mdi-steam</v-icon>
                  to steam page
                </v-btn>
                <v-btn text @click="$router.push('/times/submit')">
                  <v-icon class="mr-2">mdi-cloud-upload</v-icon>
                  submit replay
                </v-btn>
              </v-toolbar-items>
          </v-toolbar>
        </template>

        <template v-slot:[`item.author.name`]="{ item }">
          <v-avatar size="36" class="mr-1">
            <v-img :src="item.author.avatarURL" />
          </v-avatar>
          {{ item.author.name }}
        </template>

        <template v-slot:[`item.duration`]="{ item }">
          {{ item.duration.toFixed(2) }}
        </template>

        <template v-slot:[`item.timestamp`]="{ item }">
          {{ new Date(item.timestamp).toDateString() }}
          {{ new Date(item.timestamp).toLocaleTimeString() }}
        </template>

        <template v-slot:[`item.verified`]="{ item }">
          <v-simple-checkbox readonly :value="item.verified" disabled />
        </template>

        <template v-slot:[`item.download`]="{ item }">
          <v-btn icon @click="download(item.id)"><v-icon>mdi-download</v-icon></v-btn>
        </template>

        <template v-slot:[`item.report`]="{ item }">
          <v-btn v-if="!item.verified" icon @click="promptReason(item.id)">
            <v-icon>mdi-alert</v-icon>
          </v-btn>
          <v-btn v-else icon @click="cannotReport">
            <v-icon>mdi-alert</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </template>
    <report-overlay 
      :visible="reportOverlay" 
      v-model="reportReason" 
      @close="closeOverlay" 
      @report="report(reportOverlayTimeID)"
      />
  </div>
</template>

<script>
import ReportOverlay from './ReportOverlay';

export default {
  name: 'RecordsTable',
  data: () => ({
    headers: [
      {
        text: 'Runner',
        align: 'start',
        sortable: false,
        value: 'author.name'
      },
      { text: 'Time', value: 'duration' },
      { text: 'Submitted', value: 'timestamp' },
      { text: 'Verified', value: 'verified' },
      { text: 'Download', value: 'download', sortable: false },
      { text: 'Report', value: 'report', sortable: false },
    ],
    reportOverlay: false,
    reportOverlayTimeID: null,
    reportReason: "",
  }),
  props: {
    times: Array,
  },
  methods: {
    download(id) {
      this.$store.dispatch('downloadTime', id);
    },
    toLevelSteamPage() {
      window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(this.level.steam_id)}`, '_blank');
    },
    report(time) {
      this.$store.dispatch('report', { time, reason: this.reportReason });
      this.reportOverlay = false;
      this.reportOverlayTimeID = null;
      this.reportReason = "";
    },
    promptReason(time_id) {
      this.reportOverlay = true;
      this.reportOverlayTimeID = time_id;
    },
    closeOverlay() {
      this.reportOverlay = false;
      this.reportOverlayTimeID = null;
      this.reportReason = ""
    },
    cannotReport() {
      this.$snotify.warning('Time is already verified!', 'Cannot report time.')
    }
  },
  computed: {
    level() {
      if (this.times.length === 0) {
        return null;
      } else {
        return this.times[0].level;
      }
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
