<template>
  <v-dialog max-width="700px">
    <template #activator="{ on }">
      <v-btn v-on="on">+</v-btn>
    </template>
    <v-card>
      <v-card-title>Add InSpec Profile</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="repository"
          label="Git Repository"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="$emit('cancel')"
          >Cancel</v-btn
        >
        <v-btn color="blue darken-1" @click="addProfile">Add</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'

@Component({})
export default class AddProfileModal extends Vue {
  baseURL = 'http://127.0.0.1:3001'
  repository = ''

  addProfile() {
    this.$axios.get(`${this.baseURL}/profiles/add`, {
      params: {
        repository: this.repository,
      },
    })
    this.$emit('addProfile')
  }
}
</script>
