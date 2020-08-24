<template>
<div>
	<v-banner class="text-h5 text-center">Recent Times</v-banner>
	<time-card-carousel :times="$store.getters.recentTimes" />
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