<template>
<v-tooltip top>
  <template v-slot:activator="{ on }">
    <v-btn v-on="on" icon @mousedown.stop @mouseover.stop @click.stop="togglePin">
      <v-icon v-if="pinned">mdi-pin-outline</v-icon>
      <v-icon v-else>mdi-pin</v-icon>
    </v-btn>
  </template>
  <span v-if="!pinned">pin time</span>
  <span v-else>unpin time</span>
</v-tooltip>
</template>
<script>
export default {
  name: 'TimePinButton',
  props: {
    time: Object,
  },
  methods: {
    pin() {
      this.$store.dispatch('pin', this.time.id);
    },
    unpin() {
      this.$store.dispatch('unpin', this.time.id);
    },
    togglePin() {
      if (this.pinned) {
        this.unpin();
      } else {
        this.pin();
      }
    },
  },
  computed: {
    pinned() {
      return this.time.pinned;
    },
  },
};
</script>
<style lang="scss" scoped>
  
</style>
