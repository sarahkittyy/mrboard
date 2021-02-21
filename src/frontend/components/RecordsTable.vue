<template>
  <div class="ma-4">
    <template v-if="level != null">
      <v-data-table
        :items="times"
        :headers="headers"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
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
            <v-img :src="item.author.avatarURL" alt="Record holder's avatar" />
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
          <small-report-button
            :time=item
          />
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import SmallReportButton from '~/SmallReportButton';

export default {
  name: 'RecordsTable',
  data: () => ({
    sortBy: 'duration',
    sortDesc: false,
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
  }),
  props: {
    level: Object,
  },
  methods: {
    download(id) {
      this.$store.dispatch('downloadTime', id);
    },
    toLevelSteamPage() {
      window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(this.level.steam_id)}`, '_blank');
    },
  },
  computed: {
    authorized() {
      let rdy = this.$store.getters.authReady;
      let status = this.$store.getters.myAuthLevel;
      return rdy && (status > 0);
    },
    times() {
      return this.level.times;
    },
  },
  components: {
    SmallReportButton,
  },
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
