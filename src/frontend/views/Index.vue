<template>
  <v-app style="background: rgba(0,0,0,0);">
  <app-bar @open-drawer="drawerOpen = true" :title="title" />
  <main-drawer v-model="drawerOpen" />
  <v-img src="/assets/bg.png" class="bg" alt="Screenshot of Marble Race gameplay background image." />
  <router-view v-on:child-init="onChildInit"></router-view>
  <vue-snotify />
  </v-app>
</template>

<script>
import AppBar from '~/AppBar';
import MainDrawer from '~/MainDrawer';

export default {
  name: 'Index',
  data: () => ({
    drawerOpen: null,
    title: ''
  }),
  components: {
    AppBar,
    MainDrawer,
  },
  methods: {
    onChildInit(v) {
      this.title = v;
    }
  },
  watch: {
    $route(to, from) {
      this.$snotify.clear();
    }
  }
}
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
