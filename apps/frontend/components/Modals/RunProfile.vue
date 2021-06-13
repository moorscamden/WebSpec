<template>
  <v-dialog max-width="700px">
    <template #activator="{ on }">
      <v-btn v-on="on">Run</v-btn>
    </template>
    <v-card>
      <v-card-title>Run {{ profile.filename }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="target" label="Target"></v-text-field>
        <v-text-field v-model="user" label="Username"></v-text-field>
        <v-text-field v-model="password" label="Password"></v-text-field>
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
import { Prop } from 'vue-property-decorator'
import { Profile } from '../ProfileList.vue'

@Component({})
export default class RunProfileModal extends Vue {
  @Prop() profile!: Profile
  baseURL = 'http://127.0.0.1:3001'
  target = ''
  user = ''
  password = ''

  addProfile() {
    this.$axios.get(`${this.baseURL}/run/${this.profile.id}`, {
      params: {
        target: this.target,
        user: this.user,
        password: this.password,
      },
    })
    this.$emit('addProfile')
  }
}
</script>
