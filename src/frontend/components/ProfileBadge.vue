<template>
<div>
	<div v-if="$store.state.auth.auth">
		authed
	</div>
	<div v-else>
		nyot authed
	</div>
</div>	
</template>

<script>
export default {
	name: 'ProfileBadge',
	created() {
		this.$store.dispatch('refreshAuth');
	}
};
</script>

<style lang="scss" scoped>

</style>