<template>
  <v-navigation-drawer
    v-model="open"
    absolute
    temporary
    @keydown.esc="this.open = false"
    >
    <v-list>
      <v-list-item>
        <v-list-item-content>
          <h1>Menu</h1>	
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        v-for="(item, index) in menuItems"
        :key="'norm' + index"
        @click="clickDrawerItem(item.fn, item.arg)"
        >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>
          {{ item.name }}
        </v-list-item-title>
      </v-list-item>
      <!-- moderator items -->
      <template v-if="$store.getters.myAuthLevel >= 2">
        <v-list-item>
          <v-list-item-content>
            <h1>Moderator</h1>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in menuItemsModerator"
          :key="'mod' + index"
          @click="clickDrawerItem(item.fn, item.arg)"
          >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </template>
      <!-- admin items -->
      <template v-if="$store.getters.myAuthLevel >= 3">
        <v-list-item>
          <v-list-item-content>
            <h1>Admin</h1>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="(item, index) in menuItemsAdmin"
          :key="'admin' + index"
          @click="clickDrawerItem(item.fn, item.arg)"
          >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            {{ item.name }}
          </v-list-item-title>
        </v-list-item>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'MainDrawer',
  data: () => ({
    menuItems: [
      {
        name: 'Home',
        icon: 'mdi-home',
        fn: 'goTo',
        arg: '/',
      },
      {
        name: 'Submit Time',
        icon: 'mdi-cloud-upload',
        fn: 'goTo',
        arg: '/times/submit'
      }
    ],
    menuItemsModerator: [
      {
        name: 'Reports',
        icon: 'mdi-alert',
        fn: 'goTo',
        arg: '/reports'
      }
    ],
    menuItemsAdmin: [
    ],
  }),
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    clickDrawerItem(fn, arg) {
      this[fn](arg);
    },
    goTo(loc) {
      this.$router.push(loc);
    },
    keydown(ev) {
      if (ev.key === 'Escape') {
        this.open = false;
      }
    }
  },
  computed: {
    open: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      }
    }
  },
  mounted() {
    window.addEventListener('keydown', this.keydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.keydown);
  }
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
