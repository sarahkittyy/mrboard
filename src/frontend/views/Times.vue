<template>
  <router-view @child-init="onChildInit" />
</template>

<script>

export default {
  name: 'Times',
  data: () => ({
  }),
  methods: {
    onChildInit(v) {
      this.$emit('child-init', v);
    }
  }
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
