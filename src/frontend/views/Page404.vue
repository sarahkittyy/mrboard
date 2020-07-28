<template>
<v-app>
	<v-container class="ma-auto">
		<v-row align-content="center" justify="center">
			<v-col>
				<h1 class="text-center">
					oh nO ;A;
				</h1>
			</v-col>
		</v-row>
		<v-row align-content="center" justify="center">
			<v-col class="text-center">
				<h4 class="text-center">
					...this page doesn't exist :(
				</h4>
			</v-col>
		</v-row>
		<v-row align-content="center" justify="center">
			<v-col class="text-center">
				<v-btn color="primary" @click="goHome()"><v-icon>mdi-arrow-left</v-icon>go home</v-btn>
			</v-col>
		</v-row>
	</v-container>
</v-app>
</template>

<script>
export default {
	name: 'Page404',
	mounted() {
		document.title = "404 ;A;";
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