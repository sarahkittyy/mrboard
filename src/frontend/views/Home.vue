<template>
<div>
	<time-card-carousel />
</div>
</template>

<script>
import TimeCardCarousel from '~/TimeCardCarousel';

export default {
	name: 'Home',
	props: {
		title: String,
	},
	mounted() {
		document.title = "MRBoard Home";
		this.$emit('child-init', this.title);
	},
	components: {
		TimeCardCarousel
	},
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>