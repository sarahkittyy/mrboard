<template>
  <div>
    <v-menu v-if="$store.getters.myAuthLevel > 0" offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn text block v-on="on" v-bind="attrs">
          <v-row align="center" justify="center">
            <v-col md="auto">
              <span class="text-xl-center">{{ $store.getters.myDisplayname }}</span>
            </v-col>
            <v-col>
              <v-avatar>
                <v-img :src="$store.getters.myAvatar" alt="Your avatar." />
              </v-avatar>
            </v-col>
          </v-row>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>mdi-exit-to-app</v-icon>
          </v-list-item-icon>
          <v-list-item-content>Logout</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-img 
      v-else
      class="clickable ma-2"
      contain
      max-height="100%"
      @click="login()"
      src="/assets/sign-in.png"
      alt="Steam sign-in button."
    />
  </div>	
</template>

<script>
export default {
  name: 'ProfileBadge',
  data: () => ({
  }),
  methods: {
    login() {
      window.location.replace('/api/auth/login?back=' + encodeURIComponent(this.route));
    },
    logout() {
      window.location.replace('/api/auth/logout?back=' + encodeURIComponent(this.route));
    },
  },
  computed: {
    route() {
      return this.$route.path;
    },
  }
};
</script>

<style lang="scss" scoped>

@use '~@/common';

.clickable {
  &:hover {
    cursor: pointer;
  }
}

</style>
