<template>
  <div>
    <v-banner class="text-h5 text-center">
      <v-row align="center" justify="end">
        <v-col />
          <v-col>
            <span class="absolute-center">Recent Times</span>
          </v-col>
          <v-col class="py-0 my-0">
            <v-btn @click="$router.push('/times/submit')" color="primary">
              <v-icon class="mr-2">mdi-cloud-upload</v-icon>
              <span class="text-center">Submit Time</span>
            </v-btn>
          </v-col>
      </v-row>
    </v-banner>
    <time-card-carousel :times="$store.getters.recentTimes" />
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
