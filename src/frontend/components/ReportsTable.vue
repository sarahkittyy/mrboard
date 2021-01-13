<template>
<div class="ma-4">
  <v-data-table
    class="my-2"
    v-if="reports != null"
    :items="reports"
    :headers="headers"
  >
    <template v-slot:top>
      <v-toolbar color="primary">
        <v-toolbar-title>
          <v-icon>mdi-alert</v-icon>
          Reports
        </v-toolbar-title>
      </v-toolbar>
    </template>

    <template v-slot:[`item.user.name`]="{ item }">
      <v-avatar size="36" class="mr-1">
        <v-img :src="item.user.avatarURL" />
      </v-avatar>
      {{ item.user.name }}
    </template>

    <template v-slot:[`item.level`]="{ item }">
      {{ item.level.name }} {{ item.level.campaign ? `- ${item.level.campaign}` : '' }}
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="toLevelSteamPage(item.level)">
            <v-icon>mdi-steam</v-icon>
          </v-btn>
        </template>
        <span>to steam page</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on" @click="toLevelPage(item.level)">
            <v-icon>mdi-chevron-right-box</v-icon>
          </v-btn>
        </template>
        <span>to level page</span>
      </v-tooltip>
    </template>

    <template v-slot:[`item.time`]="{ item }">
      <template v-if="$store.getters.usersReady">
        <v-avatar size="36" class="mr-1">
          <v-img :src="$store.getters.userById(item.userID).avatarURL" />
        </v-avatar>
        {{ item.time.duration.toFixed(2) }}s by {{ $store.getters.userById(item.userID).name }}
      </template>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" @click="downloadReplay(item.time)" icon>
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
        <span>download .rpl</span>
      </v-tooltip>
    </template>

    <template v-slot:[`item.time.createdAt`]="{ item }">
      {{ new Date(item.time.createdAt).toDateString() }}
      {{ new Date(item.time.createdAt).toLocaleTimeString() }}
    </template>

    <template v-slot:[`item.time.timestamp`]="{ item }">
      {{ new Date(item.time.timestamp).toDateString() }}
      {{ new Date(item.time.timestamp).toLocaleTimeString() }}
    </template>

    <template v-slot:[`item.reason`]="{ item }">
      <v-btn icon @click="openOverlay(item.reason)">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </template>

    <template v-slot:[`item.time.verified`]="{ item }">
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" @click="accept(item.time)" icon>
            <v-icon>mdi-check</v-icon>
          </v-btn>
        </template>
        <span>accept time</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn v-on="on" v-bind="attrs" @click="reject(item.time)" icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </template>
        <span>reject time</span>
      </v-tooltip>
    </template>

  </v-data-table>

	<v-overlay v-model="overlayOpen">
		<v-card min-width="500px">
			<v-btn icon @click.stop="closeOverlay" @mousedown.stop @mouseover.stop>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title>
				Reason for report:
			</v-card-title>
			<v-card-text>
        <span v-if="currentOverlayReason.length != 0">
          {{ currentOverlayReason }}
        </span>
        <span v-else>[no reason given]</span>
			</v-card-text>
		</v-card>
	</v-overlay>
</div>
</template>
<script>
export default {
  name: 'ReportsTable',
  props: {
    reports: Array,
  },
  data: () => ({
    currentOverlayReason: '',
    overlayOpen: false,
    headers: [
      {
        text: 'Reporter',
        align: 'start',
        sortable: false,
        value: 'user.name',
      },
      { text: 'Level', value: 'level' },
      { text: 'Time', value: 'time' },
      { text: 'Posted', value: 'time.createdAt' },
      { text: 'Set On', value: 'time.timestamp' },
      { text: 'Reason', value: 'reason' },
      { text: 'Validate', value: 'time.verified', sortable: false },
    ],
  }),
  mounted() {
    this.$store.dispatch('fetchUsers');
  },
  methods: {
		toLevelSteamPage(level) {
			window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(level.steam_id)}`, '_blank');
		},
    toLevelPage(level) {
      this.$router.push(`/levels/${level.id}`);
    },
		downloadReplay(time) {
			this.$store.dispatch('downloadTime', time.id);
		},
    accept(time) {
      this.$store.dispatch('accept', time.id);
    },
    reject(time) {
      this.$store.dispatch('reject', time.id);
    },
    openOverlay(reason) {
      this.overlayOpen = true;
      this.currentOverlayReason = reason;
    },
    closeOverlay() {
      this.overlayOpen = false;
      this.currentOverlayReason = '';
    }
  },
};
</script>
<style lang="scss" scoped>

@use '~@/common';
  
</style>
