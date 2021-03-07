<template>
<v-app-bar app color="primary">
  <v-app-bar-nav-icon @click="$emit('open-drawer')"></v-app-bar-nav-icon>
  <v-img 
    class="clickable mr-4"
    @click="toSteamPage()"
    max-width="40"
    contain
    alt="Marble Race Logo"
    src="/assets/mr-logo.webp"></v-img>
  <v-toolbar-title v-if="showTitle" color="white">
    marble race community boards [beta]
  </v-toolbar-title>
  <v-spacer></v-spacer>
  <div class="text-h5 absolute-center">{{ title }}</div>
  <v-spacer></v-spacer>
  <profile-badge></profile-badge>
</v-app-bar>
</template>

<script>
import ProfileBadge from '~/ProfileBadge';

import debounce from 'debounce';

export default {
  name: 'AppBar',
  props: {
    title: {
      type: String,
      required: true
    },
  },
  data: () => ({
    width: window.innerWidth,
  }),
  components: {
    ProfileBadge,
  },
  mounted() {
    window.addEventListener('resize', this.recomputeWidth);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.recomputeWidth);
  },
  methods: {
    toSteamPage() {
      document.location = 'https://store.steampowered.com/app/851640/Marble_Race/';
    },
    recomputeWidth: debounce(function () {
      this.width = window.innerWidth;
    }, 400),
  },
  computed: {
    showTitle() {
      return this.width > 950;
    },
  },
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.clickable {
  &:hover {
    cursor: pointer;
  }
}

.absolute-center {
  position: absolute;
  width: 300px;
  left: calc(50% - 150px);
  text-align: center;
  margin: none;
  padding: none;
}

</style>
