<template>
<v-app style="background: rgba(0,0,0,0);">
	<app-bar @open-drawer="openDrawer" />
	<v-img src="/assets/bg.png" class="parallax-bg" />
	<v-navigation-drawer
		v-model="drawerOpen"
		absolute
		temporary
		@keydown.esc="closeDrawer"
	>
	</v-navigation-drawer>
</v-app>
</template>

<script>
import AppBar from '~/AppBar';

export default {
	name: 'Home',
	data: () => ({
		drawerOpen: null,
	}),
	mounted() {
		document.title = "MRBoard";
		window.addEventListener('keydown', (ev) => {
			if (ev.key === 'Escape') {
				this.closeDrawer();
			}
		})
	},
	methods: {
		openDrawer() {
			this.drawerOpen = true;
		},
		closeDrawer() {
			this.drawerOpen = false;
		}
	},
	components: {
		AppBar,
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';


.parallax-bg {
	opacity: 0.2;
	position: fixed;
	top: 0;
	left: 0;
	height: 100vh;
	z-index: -999999999;
}

</style>