<template>
  <div class="ma-4">
    <v-data-table
      :search="search"
      class="my-2"
      v-if="levels != null"
      :items="levelsFiltered"
      :headers="headers"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :custom-filter="filter"
    >
      <template v-slot:top>
        <v-toolbar color="primary">
          <v-toolbar-title>Levels</v-toolbar-title>
          <v-spacer />
          <v-toolbar-items>
            <v-row>
              <v-col>
                <v-text-field
                  solo dense clearable single-line
                  prepend-inner-icon="mdi-magnify"
                  color="black"
                  v-model="search"
                  label="Search"
                  class="mx-4 d-flex align-center"
                  clear-icon="mdi-close"
                  height="10px"
                />
              </v-col>
            </v-row>
          </v-toolbar-items>
        </v-toolbar>
      </template>

      <template v-slot:[`item.name`]="{ item }">
        <!-- aang is -->
        <v-img
          :src="item.thumbnailURL"
          alt="Level thumbnail"
          height="36"
          width="36"
          style="display: inline-block; vertical-align: middle;"
          class="mr-3"
        />
        <span>{{ item.name }}</span>
      </template>

      <template v-slot:[`item.campaign`]="{ item }">
        {{ item.campaign }}
      </template>

      <template v-slot:[`item.wr`]=" { item }">
        <template v-if="typeof wr(item) !== 'object'">
          {{ wr(item) }}
        </template>
        <template v-else>
          <v-avatar size="36" class="mr-1">
            <v-img :src="wr(item).author.avatarURL" alt="Record holder's avatar" />
          </v-avatar>
          {{ item.wr }} by {{ wr(item).author.name }}
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon @click="toUserPage(wr(item).author)">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </template>
            <span>view user's profile</span>
          </v-tooltip>
        </template>
      </template>

      <template v-slot:[`item.steam_id`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="toSteamPage(item)">
              <v-icon>mdi-steam</v-icon>
            </v-btn>
          </template>
          <span>to steam page</span>
        </v-tooltip>
      </template>

      <template v-slot:[`item.times_page`]="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon @click="toLevelPage(item)">
              <v-icon>mdi-exit-to-app</v-icon>
            </v-btn>
          </template>
          <span>view all scores</span>
        </v-tooltip>
        <v-dialog max-width="600" v-if="admin">
          <template v-slot:activator="{ on: dialog }">
            <v-tooltip top>
              <template v-slot:activator="{ on: tooltip }">
                <v-btn color="red" v-on="{...dialog, ...tooltip}" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>remove level</span>
            </v-tooltip>
          </template>
          <template v-slot:default="dialog">
            <v-card>
              <v-card-title>
                Remove this level, and all times, permanently?
              </v-card-title>
              <v-card-actions>
                <v-btn color="red" @click="deleteLevel(item); dialog.value = false;">
                  <v-icon>mdi-delete</v-icon>
                  delete
                </v-btn>
                <v-btn @click="dialog.value = false;">
                  <v-icon>mdi-close</v-icon>
                  close
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </template>

    </v-data-table>
  </div>
</template>
<script>
import escape from '../mixins/escape';

export default {
  name: 'LevelBrowser',
  data() {
    let self = this;
    return {
      sortBy: 'record',
      sortDesc: false,
      search: '',
      headers: [
        { text: 'Name', value: 'name' },
        { text: 'Campaign', value: 'campaign' },
        { text: 'Record', value: 'wr' },
        { text: 'Steam', value: 'steam_id', sortable: false, filterable: false },
        { text: 'Actions', value: 'times_page', sortable: false, filterable: false },
      ],
    };
  },
  props: {
    levels: Array,
  },
  mixins: [escape],
  methods: {
    escape() {
    },
    wr(level) {
      if (level.times.length == 0) {
        return 'No records set.';
      } else {
        let time_id = level.times
          .reduce((a, c) => (c.duration < a.duration ? c : a), { duration: Infinity })
          .id;

        let time = this.$store.getters.timeFromId(time_id);
        return time;
      }
    },
    deleteLevel(level) {
      this.$store.dispatch('deleteLevel', { id: level.id });
    },
    toSteamPage(level) {
      window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(level.steam_id)}`, '_blank');
    },
    toLevelPage(level) {
      this.$router.push(`/levels/${level.id}`);
    },
    filter(value, search, item) {
      let res = (value != null && search != null) &&
        (item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.campaign.toLowerCase().includes(search.toLowerCase()) ||
        (typeof this.wr(item) === 'object' ? 
          this.wr(item).author.name.toLowerCase().includes(search.toLowerCase()) :
          false
        ));
      return res;
    },
    toUserPage(user) {
      this.$router.push(`/profile/${user.steam_id}`);
    },
  },
  computed: {
    admin() {
      let rdy = this.$store.getters.authReady;
      let status = this.$store.getters.myAuthLevel;
      return rdy && (status >= 3);
    },
    levelsFiltered() {
      return this.levels.map(v => { 
        if (typeof this.wr(v) === 'object') {
          v.wr = this.wr(v).duration;
        } else{
          v.wr = 9999999999999;
        }
        return v;
      });
    },
  },
};
</script>
<style lang="scss" scoped>

@use '~@/common';

.search-fix {
  height: 10px;
}

</style>
