<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-sheet elevation="5" width="50%" class="text-center pa-13">
        <auth-loader :level="1">
          <template v-slot:loading>
            <v-row justify="center">
              <v-progress-circular indeterminate />
            </v-row>
          </template>

          <template v-slot:unauthorized>
            <v-row align="center" justify="center">
              <div class="text-h5 ma-5">You must be logged in to submit a replay!</div>
            </v-row>
            <v-row align="center" justify="center">
              <v-btn @click="$router.push('/')">Home</v-btn>
            </v-row>
          </template>

          <template v-slot:content>
            <v-row justify="center">
              <span class="text-h6">Submit</span>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-icon class="ml-4 mb-1" v-on="on">mdi-folder</v-icon>
                </template>
                <span>
                  Replays are located at: 
                  <pre>%userprofile%/AppData/LocalLow/Elastic Sea/Marble Race/Replays</pre>
                </span>
              </v-tooltip>
            </v-row>
            <v-row justify="center">
              <v-form style="width: 100%;" ref="form">
                <v-file-input
                  v-model="file"
                  show-size
                  :rules="rules"
                  label="Any replay .rpl file"
                />
              </v-form>
            </v-row>
            <v-row justify="center">
              <v-btn type="submit" @click="submit" :disabled="file == null || !formValid">Submit</v-btn>
            </v-row>
          </template>
        </auth-loader>
      </v-sheet>
    </v-row>
  </v-container>
</template>

<script>
import AppBar from '~/AppBar';
import AuthLoader from '~/AuthLoader';

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
    AuthLoader,
  },
  props: {
    title: String,
  },
  created() {
    this.$emit('child-init', this.title);

    this.$store.dispatch('refreshAuth');
  },
  methods: {
    submit(ev) {
      ev.preventDefault();
      var form = new FormData();
      form.append('rpl', this.file);
      this.$store.dispatch('submitTime', {
        form,
        callback: (r) => this.$router.push(r),
      });
    },
  },
  watch: {
    file() {
      this.formValid = this.$refs.form.validate();
    },
  },
};
</script>

<style lang="scss" scoped>

@use '~@/common';

</style>
