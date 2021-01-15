<template>
  <div>
    <v-banner class="text-h5 text-center">
      <v-row align="center" justify="end">
        <v-col>
          <span class="absolute-center">Recent Times</span>
        </v-col>
      </v-row>
    </v-banner>
    <time-card-carousel :times="$store.getters.recentTimes" />
    <v-tooltip top>
      <template v-slot:activator="{ on }">
        <v-btn
          bottom
          right
          fixed
          fab
          v-on="on"
          elevation="3"
          class="ma-4"
          color="primary"
          @click="$router.push('/times/submit')"
        >
          <v-icon>mdi-upload</v-icon>
        </v-btn>
      </template>
      <span>submit a replay</span>
    </v-tooltip>
  </div>
</template>

<script>
import TimeCardCarousel from '~/TimeCardCarousel';

export default {
  name: 'Home',
  props: {
    title: String,
  },
  mounted() {
    document.title = "MRBoard Home";
    this.$emit('child-init', this.title);

    this.$store.dispatch('refreshAuth');
  },
  components: {
    TimeCardCarousel
  },
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
