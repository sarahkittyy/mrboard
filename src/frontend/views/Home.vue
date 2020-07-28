<template>
<v-app>
	<v-app-bar elevate fixed color="primary">
		<v-app-bar-nav-icon />
		<v-img class="clickable mr-4" @click="toSteamPage()" max-width="40" contain alt="logo" src="/assets/mr-logo.webp" />
		<v-toolbar-title color="white">marble race community boards</v-toolbar-title>
		<v-spacer />
	</v-app-bar>
</v-app>
</template>

<script>
export default {
	name: 'Home',
	mounted() {
		document.title = "MRBoard";
	},
	methods: {
		toSteamPage() {
			document.location = 'https://store.steampowered.com/app/851640/Marble_Race/';
		}
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