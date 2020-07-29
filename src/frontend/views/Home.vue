<template>
<v-app style="background: rgba(0,0,0,0);">
	<app-bar @open-drawer="openDrawer" title="Home" />
	<v-img src="/assets/bg.png" class="bg" />
	<main-drawer v-model="drawerOpen" />
</v-app>
</template>

<script>
import AppBar from '~/AppBar';
import MainDrawer from '~/MainDrawer';

export default {
	name: 'Home',
	data: () => ({
		drawerOpen: null,
	}),
	mounted() {
		document.title = "MRBoard";
	},
	methods: {
		openDrawer() {
			this.drawerOpen = true;
		},
	},
	components: {
		AppBar,
		MainDrawer,
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>