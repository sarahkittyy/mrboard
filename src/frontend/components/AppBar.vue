<template>
<v-app-bar app fixed color="primary">
	<v-app-bar-nav-icon @click="$emit('open-drawer');" />
	<v-img class="clickable mr-4" @click="toSteamPage()" max-width="40" contain alt="logo" src="/assets/mr-logo.webp" />
	<v-toolbar-title color="white">marble race community boards [beta]</v-toolbar-title>
	<v-spacer />
	<div class="text-h5 absolute-center">{{ title }}</div>
	<v-spacer />
	<profile-badge />
</v-app-bar>
</template>

<script>
import ProfileBadge from '~/ProfileBadge';

export default {
	name: 'AppBar',
	props: {
		title: {
			type: String,
			required: true
		},
	},
	components: {
		ProfileBadge,
	},
	methods: {
		toSteamPage() {
			document.location = 'https://store.steampowered.com/app/851640/Marble_Race/';
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

.absolute-center {
	position: absolute;
	width: 300px;
	left: calc(50% - 150px);
	text-align: center;
	margin: none;
	padding: none;
}

</style>
