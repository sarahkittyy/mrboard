<template>
<v-card :width="width" :height="height">
	<template v-if="skeleton">
		<v-skeleton-loader type="image" />
		<v-card-title>
			<v-skeleton-loader type="text" />
		</v-card-title>
		<v-card-subtitle>
			<v-skeleton-loader type="text" />
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
	</template>
</v-card>	
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
}
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>