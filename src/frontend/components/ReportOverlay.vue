<template>
	<v-overlay v-model="visible">
		<v-card min-width="500px">
			<v-btn icon @click.stop="closeOverlay()" @mousedown.stop @mouseover.stop>
				<v-icon>mdi-close</v-icon>
			</v-btn>
			<v-card-title>
				Submitting report
			</v-card-title>
			<v-card-text>
				<v-textarea
					placeholder="reason? (optional)"
		 			:value="value"
          @input="txt => $emit('input', txt)"
				>
				</v-textarea>
			</v-card-text>
			<v-card-actions>
				<v-btn text @click="$emit('report')">
					<v-icon class="mr-2">mdi-upload</v-icon>
					Submit
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-overlay>
</template>
<script>
export default {
  props: {
    visible: Boolean,
    value: String,
  },
  methods: {
    closeOverlay() {
      this.$emit('close');
    }
  }
};
</script>
<style lang="scss" scoped>

@use '~@/common';
  
</style>
