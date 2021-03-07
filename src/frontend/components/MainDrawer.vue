<template>
  <v-navigation-drawer
    v-model="open"
    fixed
    app
    temporary
    @keydown.esc="this.open = false"
    >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <h1>Menu</h1>	
        </v-list-item-content>
      </v-list-item>
      <!-- default items -->
      <v-list-item @click="$router.push('/')">
        <v-list-item-icon>
          <v-icon>mdi-home</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <v-list-item @click="$router.push('/times/submit')">
        <v-list-item-icon>
          <v-icon>mdi-cloud-upload</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Submit Time</v-list-item-title>
      </v-list-item>

      <v-list-item @click="$router.push('/levels')">
        <v-list-item-icon>
          <v-icon>mdi-magnify</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Levels</v-list-item-title>
      </v-list-item>

      <v-divider />

      <v-list-item @click="toDiscordServer">
        <v-list-item-icon>
          <v-icon>mdi-discord</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Discord</v-list-item-title>
      </v-list-item>

      <!-- moderator items -->
      <template v-if="$store.getters.myAuthLevel >= 2">
        <v-list-item>
          <v-list-item-content>
            <h1>Moderator</h1>
          </v-list-item-content>
        </v-list-item>

        <v-list-item @click="$router.push('/reports')">
          <v-list-item-icon>
            <v-icon>mdi-alert</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Reports</v-list-item-title>
        </v-list-item>

      </template>
      <!-- admin items -->
      <template v-if="$store.getters.myAuthLevel >= 3">
        <v-list-item>
          <v-list-item-content>
            <h1>Admin</h1>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import escape from '../mixins/escape';

export default {
  name: 'MainDrawer',
  mixins: [escape],
  data: () => ({
  }),
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    escape() {
      this.open = false;
    },
    toDiscordServer() {
      window.open('https://discord.gg/wQ7uKnhm9r');
    },
  },
  computed: {
    open: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      }
    },
  },
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
