<template>
<v-card :width="width" :height="height">
	<template v-if="skeleton">
		<v-card-text>
			<v-skeleton-loader type="text" />
		</v-card-text>
	</template>
	<template v-else>
		<v-card-text>
			{{ time.level.name }}
		</v-card-text>
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