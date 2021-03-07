<template>
  <div class="ma-4">
    <v-data-table
      :search="search"
      class="my-2"
      v-if="levels != null"
      :items="levels"
      :headers="headers"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
    >
      <template v-slot:top>
        <v-toolbar color="primary">
          <v-toolbar-title>Levels</v-toolbar-title>
          <v-spacer />
          <!--TODO add search bar-->
          <v-toolbar-items>
            <v-text-field
              solo dense clearable single-line
              prepend-inner-icon="mdi-magnify"
              color="black"
              v-model="search"
              label="Search"
              class="mx-4 d-flex align-center"
            />
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

      <template v-slot:[`item.times`]=" { item }">
        <template v-if="typeof wr(item) !== 'object'">
          {{ wr(item) }}
        </template>
        <template v-else>
          <v-avatar size="36" class="mr-1">
            <v-img :src="wr(item).author.avatarURL" alt="Record holder's avatar" />
          </v-avatar>
          {{ wr(item).duration }} by {{ wr(item).author.name }}
        </template>
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

    </v-data-table>
  </div>
</template>
<script>
import escape from '../mixins/escape';

export default {
  name: 'LevelBrowser',
  data: () => ({
    sortBy: '',
    sortDesc: true,
    search: '',
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Campaign', value: 'campaign' },
      { text: 'Record', value: 'times' },
      { text: 'Times', value: 'times_page' },
      { text: 'Steam', value: 'steam_id' },
    ],
  }),
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
    toSteamPage(level) {
      window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(level.steam_id)}`, '_blank');
    },
    toLevelPage(level) {
      this.$router.push(`/levels/${level.id}`);
    }
  },
};
</script>
<style lang="scss" scoped>

@use '~@/common';

</style>
<style lang="scss">

.v-input__control {
  height: 0 !important;
}

</style>
