<template>
<div>
	<v-container
		v-if="$store.state.times.fetching || $store.state.times.all == null"
		fluid	
	>
		<v-row align="center" justify="center" class="tc-row">
			<v-col v-for="(n, i) in visibleCt" :key="'skelly' + i" cols="auto">
				<time-card
					skeleton
					:width="`${timeCardSize}px`"
					:height="`${timeCardSize}px`"
				/>
			</v-col> 
		</v-row>
		<v-pagination :length="visibleCt" disabled />
	</v-container>

	<!-- -->

	<v-container v-else>
		<v-row align="center" justify="center" class="tc-row">
			<v-col 
        v-for="(time, i) in paginationTimes"
        :key="'valid' + i + pagination"
        cols="auto"
      >
				<time-card
					:time="time"
					:width="`${timeCardSize}px`"
					:height="`${timeCardSize}px`"
				/>
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
		timeCardSize: 300,
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
		window.addEventListener('resize', this.computeVisibleCt);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.computeVisibleCt);
	},
	components: {
		TimeCard,
	},
	methods: {
		computeVisibleCt: debounce(function() {
			this.visibleCt = Math.floor(window.innerWidth / (this.timeCardSize + 32)) - 1;
		}, 400),
	},
	computed: {
		paginationTimes() {
			return this.times.slice(this.pagination - 1, this.pagination + this.visibleCt);
		},
	},
}
</script>

<style lang="scss" scoped>

@use '~@/common';

.tc-row {
  flex-wrap: nowrap;
  min-width: 90%;
}

</style>
