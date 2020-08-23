<template>
<div>
	<v-container
		v-if="$store.state.times.fetching || $store.state.times.all == null"
		fluid	
	>
		<v-row align="center" justify="center">
			<v-col v-for="n in visibleCt" cols="auto">
				<time-card :key="n" skeleton />
			</v-col> 
		</v-row>
		<v-pagination :length="visibleCt" disabled />
	</v-container>

	<!-- -->

	<v-container v-else>
		<v-row align="center" justify="center">
			<v-col v-for="(time, index) in paginationTimes" cols="auto">
				<time-card :key="index" :time="time" />
			</v-col>
		</v-row>
		<v-pagination 
			total-visible="8"
			v-model="pagination"
			:length="Math.max(times.length - visibleCt, 1)"
		/>
	</v-container>
</div>
</template>

<script>
import TimeCard from '~/TimeCard';

import debounce from 'debounce';

export default {
	name: 'TimeCardCarousel',
	data: () => ({
		pagination: 1,
		visibleCt: 1,
	}),
	props: {
		times: {
			type: Array,
			default: [],
		}
	},
	mounted() {
		this.$store.dispatch('fetchTimes');
		
		this.computeVisibleCt();
		window.addEventListener('resize', debounce(() => {
			this.computeVisibleCt();
		}, 400));
	},
	beforeDestroy() {
		window.removeEventListener('resize');
	},
	components: {
		TimeCard,
	},
	methods: {
		computeVisibleCt() {
			this.visibleCt = Math.floor(window.innerWidth / 300) - 1;
		},
	},
	computed: {
		paginationTimes() {
			return this.times.slice(this.pagination - 1, this.pagination - 1 + this.visibleCt);
		},
	},
}
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>