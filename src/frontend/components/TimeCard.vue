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
          <v-img
            :src="time.level.thumbnailURL"
            alt="Thumbnail for the associated workshop level"
            max-height="169px"
          />
          <v-card-title>
            <div class="no-text-wrap">{{ time.level.name }}</div>
          </v-card-title>
          <v-card-subtitle>
            {{ time.duration.toFixed(2) }}s by {{ time.author.name }}
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
            <small-report-button
              :time="time"
            />
            <template v-if="moderator">
              <v-divider />
              <time-pin-button :time="time" />
            </template>
          </v-card-actions>

          <v-overlay v-model="overlay">
            <v-card>
              <v-btn @mousedown.stop @mouseover.stop @click.stop="closeOverlay" icon>
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <time-pin-button v-if="moderator" :time="time" />
              <v-img
                :src="time.level.thumbnailURL"
                alt="Thumbnail for the associated workshop level"
              />
                <v-card-title>
                  {{ time.level.name }}
                </v-card-title>
                <v-card-subtitle>
                  Time: {{ time.duration.toFixed(2) }}<br />
                  Set on: {{ dateString }}<br />
                  Posted: {{ uploadedString }}<br />
                  Runner: {{ time.author.name }}
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
  </div>
</template>

<script>
import SmallReportButton from '~/SmallReportButton';
import TimePinButton from '~/TimePinButton';

import escape from '../mixins/escape';

export default {
  name: 'TimeCard',
  data: () => ({
    overlay: false,
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
  mixins: [escape],
  methods: {
    escape() {
      this.overlay = false;
    },
    toSteamPage() {
      window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(this.time.level.steam_id)}`, '_blank');
    },
    toggleOverlay() {
      this.overlay = !this.overlay;
    },
    closeOverlay() {
      this.overlay = false;
    },
    downloadReplay() {
      this.$store.dispatch('downloadTime', this.time.id);
    },
    toLevelPage() {
      this.$router.push(`/levels/${encodeURIComponent(this.time.level.id)}`);
    },
  },
  computed: {
    dateString() {
      return `${new Date(this.time.timestamp).toLocaleDateString()} ${new Date(this.time.timestamp).toLocaleTimeString()}`;
    },
    uploadedString() {
      return `${new Date(this.time.createdAt).toLocaleDateString()} ${new Date(this.time.createdAt).toLocaleTimeString()}`;
    },
    moderator() {
      let rdy = this.$store.getters.authReady;
      let status = this.$store.getters.myAuthLevel;
      return rdy && (status >= 2);
    },
  },
  components: {
    SmallReportButton,
    TimePinButton,
  },
}
</script>

<style lang="scss" scoped>

@use '~@/common';

.no-text-wrap {
  white-space: nowrap;
  overflow: hidden;
  word-break: normal;
  text-overflow: ellipsis;
}

</style>
