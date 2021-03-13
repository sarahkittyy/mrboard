<template>
  <auth-loader>
    <template v-slot:loading>
      <v-progress-circular indeterminate class="absolute-center" />
    </template>
    
    <template v-slot:unauthorized v-if="!isId">
      <v-row align="center" justify="center">
        <v-sheet elevation="5" width="50%" class="text-center pa-13">
          <div class="text-h5 ma-5">You're not logged in.</div>
          <v-btn @click="$router.push('/')">Home</v-btn>
          <v-btn class="ml-4" @click="login">Login</v-btn>
        </v-sheet>
      </v-row>
    </template>

    <template v-slot:unauthorized v-else>
      <profile-content :user="user" />
    </template>

    <template v-if="user != null" v-slot:content>
      <profile-content :user="user" />
    </template>

    <template v-else v-slot:content>
      <v-row align="center" justify="center">
        <v-sheet elevation="5" width="50%" class="text-center pa-13">
          <div class="text-h5 ma-5">Could not find user with Steam ID#{{ $route.params.id }}</div>
          <v-btn @click="$router.push('/')">Home</v-btn>
        </v-sheet>
      </v-row>
    </template>
  </auth-loader>
</template>
<script>
import AuthLoader from '~/AuthLoader';
import ProfileContent from '~/ProfileContent';

export default {
  name: 'Profile',
  mounted() {
    this.$store.dispatch('refreshAuth');
    if (this.$route.params.id) {
      this.$store.dispatch('fetchUsers');
    }
  },
  components: {
    AuthLoader,
    ProfileContent,
  },
  methods: {
    login() {
      window.location.replace('/api/auth/login?back=' + encodeURIComponent(this.$route.path));
    },
  },
  computed: {
    user() {
      if (this.$route.params.id) {
        return this.$store.getters.userBySteamId(this.$route.params.id);
      } else {
        return this.$store.getters.me;
      }
    },
    isId() {
      return this.$route.params.id != null;
    },
  },
};
</script>
<style lang="scss" scoped>

@use '~@/common';

.absolute-center {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>
