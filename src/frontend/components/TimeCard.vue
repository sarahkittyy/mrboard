<template>
<v-hover v-slot:default="{ hover }">
	<v-card :elevation="hover ? 16 : 2" :width="width" :height="height" @click="toggleOverlay">
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
					<template v-slot:activator="{ on }">
						<v-btn icon @mousedown.stop @mouseover.stop @click.stop="toSteamPage" v-on="on"><v-icon>mdi-steam</v-icon></v-btn>
					</template>
					<span>go to steam page</span>
				</v-tooltip>
				<v-tooltip top>
					<template v-slot:activator="{ on }">
						<v-btn icon @mousedown.stop @mouseover.stop @click.stop="downloadReplay" v-on="on"><v-icon>mdi-download</v-icon></v-btn>
					</template>
					<span>download .rpl file</span>
				</v-tooltip>
			</v-card-actions>
			
			<v-overlay v-model="overlay">
				<v-card>
					<v-btn icon @click.stop="toggleOverlay" @mousedown.stop @mouseover.stop>
						<v-icon>mdi-close</v-icon>
					</v-btn>
					<v-img :src="time.level.thumbnailURL" />
					<v-card-title>
						{{ time.level.name }}
					</v-card-title>
					<v-card-subtitle>
						Time: {{ time.duration.toFixed(2) }}
					</v-card-subtitle>
					<v-card-actions>
						<v-btn text @click="toSteamPage">
							<v-icon class="mr-2">mdi-steam</v-icon>
							View Steam Page
						</v-btn>
						<v-btn text @click="downloadReplay">
							<v-icon class="mr-2">mdi-download</v-icon>
							Download Replay
						</v-btn>
						<v-btn text @click="toLevelPage">
							<v-icon class="mr-2">mdi-chevron-right-box</v-icon>
							To Level Page
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-overlay>
		</template>
	</v-card>	
</v-hover>
</template>

<script>
export default {
	name: 'TimeCard',
	data: () => ({
		overlay: false,
	}),
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
		toggleOverlay() {
			this.overlay = !this.overlay;
		},
		downloadReplay() {
			this.$store.dispatch('downloadTime', this.time.id);
		},
		toLevelPage() {
			this.$router.push(`/levels/${encodeURIComponent(this.time.level.id)}`);
		}
	}
}
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
