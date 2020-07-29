<template>
<div>

</div>
</template>

<script>
import AppBar from '~/AppBar';
import MainDrawer from '~/MainDrawer';

export default {
	name: 'Home',
	props: {
		title: String,
	},
	mounted() {
		document.title = "MRBoard Home";
		this.$emit('child-init', this.title);
	},
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>