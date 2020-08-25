<template>
<v-hover v-slot:default="{ hover }">
	<v-card :elevation="hover ? 16 : 2" :width="width" :height="height" @click="toTimePage">
		<template v-if="skeleton">
			<v-skeleton-loader type="image" />
			<v-card-title>
				<v-skeleton-loader type="text" />
			</v-card-title>
			<v-card-subtitle>
				<v-skeleton-loader type="text@2" />
			</v-card-subtitle>
		</template>
		<template v-else>
			<v-img :src="time.level.thumbnailURL" />
			<v-card-title>
				{{ time.level.name }}
			</v-card-title>
			<v-card-subtitle>
				{{ time.duration.toFixed(2) }}
			</v-card-subtitle>
			<v-card-actions>
				<v-tooltip top>
					<template v-slot:activator="{ on, attrs }">
						<v-btn icon @mousedown.stop @mouseover.stop @click.stop="toSteamPage" v-on="on"><v-icon>mdi-steam</v-icon></v-btn>
					</template>
					<span>go to steam page</span>
				</v-tooltip>
				<v-tooltip top>
					<template v-slot:activator="{ on, attrs }">
						<v-btn icon @mousedown.stop @mouseover.stop @click.stop="downloadReplay" v-on="on"><v-icon>mdi-download</v-icon></v-btn>
					</template>
					<span>download .rpl file</span>
				</v-tooltip>
			</v-card-actions>
		</template>
	</v-card>	
</v-hover>
</template>

<script>
export default {
	name: 'TimeCard',
	props: {
		time: Object,
		width: { type: String, default: '300px' },
		height: { type: String, default: '300px' },
		skeleton: {
			type: Boolean,
			default: false,
		},
	},
	methods: {
		toSteamPage() {
			window.open(`https://steamcommunity.com/sharedfiles/filedetails/?id=${encodeURIComponent(this.time.level.steam_id)}`, '_blank');
		},
		toTimePage() {
			this.$router.push(`/times/${encodeURIComponent(this.time.id)}`);
		},
		downloadReplay() {
			this.$store.dispatch('downloadTime', this.time.id);
		}
	}
}
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>