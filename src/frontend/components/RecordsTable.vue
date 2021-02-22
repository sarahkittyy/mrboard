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
          <v-simple-checkbox
            v-if="moderator"
            :value="item.verified"
            @input="toggleValidate(item)"
          />
          <v-simple-checkbox
            v-else
            :value="item.verified"
            disabled
            readonly
          />
        </template>

        <template v-slot:[`item.download`]="{ item }">
          <v-btn icon @click="download(item.id)"><v-icon>mdi-download</v-icon></v-btn>
        </template>

        <template v-slot:[`item.report`]="{ item }">
          <small-report-button
            :time="item"
          />
          <v-dialog max-width="450" v-if="moderator">
            <template v-slot:activator="{ on: dialog }">
              <v-tooltip top>
                <template v-slot:activator="{ on: tooltip }">
                  <v-btn color="red" v-on="{...dialog, ...tooltip}" icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>remove time</span>
              </v-tooltip>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-card-title>
                  Remove this time permanently?
                </v-card-title>
                <v-card-actions>
                  <v-btn color="red" @click="reject(item); dialog.value = false;">
                    <v-icon>mdi-delete</v-icon>
                    delete
                  </v-btn>
                  <v-btn @click="dialog.value = false">
                    <v-icon>mdi-close</v-icon>
                    Close
                  </v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </template>
      </v-data-table>
    </template>
  </div>
</template>

<script>
import SmallReportButton from '~/SmallReportButton';

import escape from '../mixins/escape';

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
  mixins: [escape],
  methods: {
    download(id) {
      this.$store.dispatch('downloadTime', id);
    },
    escape() {
      
    },
    toLevelSteamPage() {
      window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(this.level.steam_id)}`, '_blank');
    },
    toggleValidate(time) {
      if (time.verified) {
        this.$store.dispatch('unaccept', time.id);
      } else {
        this.$store.dispatch('accept', time.id);
      }
    },
    reject(time) {
      this.$store.dispatch('reject', time.id);
    },
  },
  computed: {
    authorized() {
      let rdy = this.$store.getters.authReady;
      let status = this.$store.getters.myAuthLevel;
      return rdy && (status > 0);
    },
    times() {
      return this.$store.getters.timesOfLevel(this.level.id);
    },
    moderator() {
      let rdy = this.$store.getters.authReady;
      let status = this.$store.getters.myAuthLevel;
      return rdy && (status >= 2);
    },
    admin() {
      let rdy = this.$store.getters.authReady;
      let status = this.$store.getters.myAuthLevel;
      return rdy && (status >= 3);
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
