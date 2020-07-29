<template>
<v-container fill-height fluid>
	<v-row align="center" justify="center">
		<v-sheet elevation="5" width="50%" class="text-center pa-13">
			<template v-if="authorized">
				<span class="text-h6">Submit</span>
				<v-form ref="form" @submit="submit">
					<v-file-input v-model="file" show-size :rules="rules" label="Any replay .rpl file" />
					<v-btn type="submit" :disabled="file == null || !formValid">Submit</v-btn>
				</v-form>
			</template>
			<template v-else>
				<div class="text-h5 ma-5">You must be logged in to submit a replay!</div>
				<v-btn @click="$router.push('/')">Home</v-btn>
			</template>
		</v-sheet>
	</v-row>
</v-container>
</template>

<script>
import AppBar from '~/AppBar';

import FormData from 'form-data';

export default {
	name: 'TimeForm',
	data: () => ({
		file: null,
		snackbar: false,
		rules: [
			value => !value || value.size < 20 * 1024 * 1024 || 'Files must be less than 20MB',
			value => !value || value.name.endsWith('.rpl') || 'File must be a .rpl file',
		],
		formValid: true,
	}),
	components: {
		AppBar,
	},
	props: {
		title: String,
	},
	created() {
		this.$store.dispatch('refreshAuth');
		this.$emit('child-init', this.title);
	},
	methods: {
		submit(ev) {
			ev.preventDefault();
			var form = new FormData();
			form.append('rpl', this.file);
			this.$store.dispatch('submitTime', form);
		}
	},
	watch: {
		file() {
			this.formValid = this.$refs.form.validate();
		},
		doneUploading(v) {
			if (v) {
				setTimeout(() => {
					this.$snotify.clear();
					this.$router.push('/');
				}, 1000);
			}
		}
	},
	computed: {
		authorized() {
			return this.$store.state.auth.status && !this.$store.state.auth.loading;
		},
		doneUploading() {
			return !this.$store.state.times.uploading && this.$store.state.times.uploadStatus;	
		}
	}
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>