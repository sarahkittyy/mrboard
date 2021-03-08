<template>
<v-container fill-height fluid class="page-box">
  <v-sheet elevation="3" class="profile-box">
    <v-img :src="user.avatarURL" max-width="256px" />
    <span class="text-h4 mt-4">
      {{ user.name }}
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="toSteamProfile">
            <v-icon>mdi-steam</v-icon>
          </v-btn>
        </template>
        <span>to steam profile page</span>
      </v-tooltip>
    </span>
    <div class="break-after">
      <v-icon class="mr-1">mdi-timer-sand</v-icon>
      <span>Times posted: {{ timesPosted }}</span>
    </div>
    <div class="break-after">
      <v-icon class="mr-1">mdi-trophy-broken</v-icon>
      <span>Total records held: {{ recordsHeld }}</span>
    </div>
    <div class="break-after">
      <v-icon class="mr-1">mdi-trophy</v-icon>
      <span>Verified records held: {{ verifiedRecordsHeld }}</span>
    </div>
    <div class="break-after">
      <v-icon class="mr-1">mdi-star-four-points</v-icon>
      <span>Overall ranking: {{ ranking }}</span>
    </div>
  </v-sheet>
  <v-sheet elevation="3" class="info-box">
    <div class="text-h3">Recent times</div>
    <time-card-carousel skeleton v-if="!timesReady" />
    <time-card-carousel v-else :times="recentTimes" />
  </v-sheet>
</v-container>
</template>
<script>
import { mapGetters } from 'vuex';

import TimeCardCarousel from '~/TimeCardCarousel';

export default {
  name: 'ProfileContent',
  props: {
    user: Object,
  },
  mounted() {
    this.$store.dispatch('fetchTimes');
    this.$store.dispatch('fetchLevels');
    this.$store.dispatch('fetchUsers');
  },
  components: {
    TimeCardCarousel,
  },
  methods: {
    toSteamProfile() {
      window.open(`https://steamcommunity.com/profiles/${this.user.steam_id}`);
    },
    wr(level) {
      let times = this.$store.getters.timesOfLevel(level.id);
      if (times.length == 0) {
        return 'No records set.';
      } else {
        let time_id = times
          .reduce((a, c) => (c.duration < a.duration ? c : a), { duration: Infinity })
          .id;

        let time = this.$store.getters.timeFromId(time_id);
        return time;
      }
    },
    recordsHeldOfUser(user) {
      return Object.values(this.levels)
        .reduce((tot, level) => {
          if (typeof this.wr(level) === 'object') {
            if (this.wr(level).author.id == user.id) {
              return tot + 1;
            } else {
              return tot;
            }
          }
        }, 0);
    },
    verifiedRecordsHeldOfUser(user) {
      return Object.values(this.levels)
        .reduce((tot, level) => {
          if (typeof this.wr(level) === 'object') {
            let wr = this.wr(level);
            if (wr.author.id == user.id && wr.verified === true) {
              return tot + 1;
            } else {
              return tot;
            }
          }
        }, 0);
    },
  },
  computed: {
    ...mapGetters(['timesReady', 'levelsReady', 'levels', 'usersReady', 'allUsers']),
    timesPosted() {
      if (!this.timesReady) return null;
      return this.$store.getters.timesOfUser(this.user.id).length;
    },
    recordsHeld() {
      if (!this.timesReady) return null;
      if (!this.levelsReady) return null;
      return this.recordsHeldOfUser(this.user);
    },
    verifiedRecordsHeld() {
      if (!this.timesReady) return null;
      if (!this.levelsReady) return null;
      return this.verifiedRecordsHeldOfUser(this.user);
    },
    recentTimes() {
      return this.$store.getters.recentUserTimes(this.user.id);
    },
    ranking() {
      if (!this.timesReady) return null;
      if (!this.levelsReady) return null;
      if (!this.usersReady) return null;
      let u = this.user;
      return this.allUsers
        .map(u => ({
          ct: this.verifiedRecordsHeldOfUser(u),
          id: u.id,
        }))
        .sort((a, b) => b.ct - a.ct)
        .findIndex((v, i) => v.id == u.id) + 1;
    },
  },
};
</script>
<style lang="scss" scoped>

@use '~@/common';

.page-box {
  display: flex;
  flex-flow: row wrap;
  align-content: start;
  justify-content: center;
}

.profile-box {
  padding: 15px;
  margin: 15px;
  display: flex;
  flex-flow: column wrap;
  align-items: center;
  justify-content: center;
}

.info-box {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  padding-top: 15px;
  margin: 15px;
  flex-grow: 1;

  .break-after {
    width: 100%;
  }
}

</style>
