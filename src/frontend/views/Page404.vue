<template>
<v-app>
	<v-container class="ma-auto">
		<v-row align-content="center" justify="center">
			<v-col>
				<h1 class="text-center">
					404 Not Found :(
				</h1>
			</v-col>
		</v-row>
		<v-row align-content="center" justify="center">
			<v-col class="text-center">
				<v-btn color="primary" @click="goHome()">go home</v-btn>
			</v-col>
		</v-row>
	</v-container>
</v-app>
</template>

<script>
export default {
	name: 'Page404',
	mounted() {
		document.title = "404 - Page not found.";
	},
	methods: {
		goHome() {
			this.$router.push('/');
		}
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>