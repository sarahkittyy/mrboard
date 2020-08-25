<template>
<div>
	{{ this.$route.params.id }}
</div>
</template>

<script>
export default {
	name: 'TimePage',
	props: {
		title: String,
	},
	created() {
		this.$emit('child-init', this.title);
	}
}
</script>

<style lang="scss" scoped>

</style>