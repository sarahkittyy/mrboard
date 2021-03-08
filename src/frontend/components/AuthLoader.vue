<template>
<v-container fill-height fluid>
  <slot v-if="!ready" name="loading"></slot>
  <slot v-else-if="ready && !authed" name="unauthorized"></slot>
  <slot v-else name="content"></slot>
</v-container>
</template>
<script>
export default {
  name: 'AuthLoader',
  data: () => ({

  }),
  props: {
    level: {
      type: Number,
      default: 1,
    },
  },
  computed: {
    ready() {
      return !this.$store.state.auth.loading;
    },
    authed() {
      let lvl = this.$store.getters.myAuthLevel;
      let stat = this.$store.state.auth.status;
      return stat && (lvl >= this.level);
    }
  },
};
</script>
<style lang="scss" scoped>
  
</style>
