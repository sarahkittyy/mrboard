<template>
<div>
	<records-table :times="filteredTimes" />
</div>
</template>

<script>
import RecordsTable from '~/RecordsTable';

import { mapGetters } from 'vuex';
import moment from 'moment';

export default {
	name: 'LevelPage',
	data: () => ({
		
	}),
	props: {
		title: String,
	},
	created() {
		this.$store.dispatch('fetchTimes');
		
		this.$emit('child-init', this.title);
		
		if (isNaN(this.$route.params.id)) {
			this.$router.push('/404');
		}
	},
	methods: {
		levelTimesBest(duration) {
			let levelTimes = this.allTimes.filter(v => v.level.id === parseInt(this.$route.params.id));
			levelTimes.sort((a, b) => a.duration < b.duration);
			return levelTimes;
		},
		levelTimesRecent(duration) {
			
		},
	},
	computed: {
		...mapGetters([
			'allTimes',
		]),
		filteredTimes() {
			return this.levelTimesBest();
		}
	},
	components: {
		RecordsTable
	}
}
</script>

<style lang="scss" scoped>

</style>