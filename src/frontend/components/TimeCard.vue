<template>
<div>
  <v-hover v-slot:default="{ hover }">
    <v-card :elevation="hover ? 16 : 2" :width="width" :height="height" @click="toggleOverlay">
      <template v-if="skeleton">
        <v-skeleton-loader type="image" />
        <v-card-title>
          <v-skeleton-loader type="text" />
        </v-card-title>
        <v-card-subtitle>
          <v-skeleton-loader type="text@2" />
        </v-card-subtitle>
      </template>
      <template v-else>
        <v-img :src="time.level.thumbnailURL" />
        <v-card-title>
          {{ time.level.name }}
        </v-card-title>
        <v-card-subtitle>
          {{ time.duration.toFixed(2) }}<br />
        </v-card-subtitle>
        <v-card-actions>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon @mousedown.stop @mouseover.stop @click.stop="toSteamPage" v-on="on"><v-icon>mdi-steam</v-icon></v-btn>
            </template>
            <span>go to steam page</span>
          </v-tooltip>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn icon @mousedown.stop @mouseover.stop @click.stop="downloadReplay" v-on="on"><v-icon>mdi-download</v-icon></v-btn>
            </template>
            <span>download .rpl file</span>
          </v-tooltip>
          <v-tooltip top v-if="!time.verified">
            <template v-slot:activator="{ on }">
              <v-btn icon @mousedown.stop @mouseover.stop @click.stop="promptReason" v-on="on">
                <v-icon>mdi-alert</v-icon>
              </v-btn>
            </template>
            <span>report level time</span>
          </v-tooltip>
          <v-tooltip top v-else>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on">mdi-check</v-icon>
            </template>
            <span>time verified!</span>
          </v-tooltip>
        </v-card-actions>
        
        <v-overlay v-model="overlay">
          <v-card>
            <v-btn icon @click.stop="toggleOverlay" @mousedown.stop @mouseover.stop>
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-img :src="time.level.thumbnailURL" />
            <v-card-title>
              {{ time.level.name }}
            </v-card-title>
            <v-card-subtitle>
              Time: {{ time.duration.toFixed(2) }}<br />
              Set on: {{ dateString }}<br />
              Posted: {{ uploadedString }}
            </v-card-subtitle>
            <v-card-actions>
              <v-btn text @click="toSteamPage">
                <v-icon class="mr-2">mdi-steam</v-icon>
                View Steam Page
              </v-btn>
              <v-btn text @click="downloadReplay">
                <v-icon class="mr-2">mdi-download</v-icon>
                Download Replay
              </v-btn>
              <v-btn text @click="toLevelPage">
                <v-icon class="mr-2">mdi-chevron-right-box</v-icon>
                To Level Page
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-overlay>
      </template>
    </v-card>	
  </v-hover>
  <report-overlay
    :visible="reportOverlay"
    v-model="reportReason"
    @report="report"
    @close="closeReport"
  />
</div>
</template>

<script>
import ReportOverlay from '~/ReportOverlay';

export default {
	name: 'TimeCard',
	data: () => ({
		overlay: false,
    reportOverlay: false,
    reportReason: '',
	}),
	props: {
		time: Object,
		width: { type: String, default: '300px' },
		height: { type: String, default: '300px' },
		skeleton: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		toSteamPage() {
			window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(this.time.level.steam_id)}`, '_blank');
		},
		toggleOverlay() {
			this.overlay = !this.overlay;
		},
		downloadReplay() {
			this.$store.dispatch('downloadTime', this.time.id);
		},
		toLevelPage() {
			this.$router.push(`/levels/${encodeURIComponent(this.time.level.id)}`);
      this.reportReason = '';
		},
    promptReason() {
      this.reportOverlay = true;
    },
    report() {
      this.$store.dispatch('report', {
        time: this.time.id,
        reason: this.reportReason,
      });
      this.closeReport();
    },
    closeReport() {
      this.reportOverlay = false;
      this.reportReason = '';
    },
	},
	computed: {
		dateString() {
			return new Date(this.time.timestamp).toLocaleDateString();
		},
		uploadedString() {
			return new Date(this.time.createdAt).toLocaleDateString();
		}
	},
  components: {
    ReportOverlay,
  },
}
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
