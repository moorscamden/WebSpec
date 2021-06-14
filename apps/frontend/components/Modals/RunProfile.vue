<template>
  <Modal :visible="visible" max-width="700px">
    <v-card>
      <v-card-title>Run {{ profile.filename }}</v-card-title>
      <v-card-text>
        <v-text-field v-model="target" label="Target"></v-text-field>
        <v-text-field v-model="user" label="Username"></v-text-field>
        <v-text-field v-model="password" label="Password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn color="blue darken-1" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="runProfile">Run</v-btn>
      </v-card-actions>
    </v-card>
    <ProgressModal
      v-if="showProgressModal"
      :visible="showProgressModal"
      :task="task"
      @close="onProfileRunComplete"
    />
  </Modal>
</template>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import { Profile } from '../ProfileList.vue'
import Modal from '~/components/Modals/Modal.vue'
import ProgressModal from '~/components/Modals/ProgressModal.vue'

@Component({
  components: {
    Modal,
    ProgressModal,
  },
})
export default class RunProfileModal extends Vue {
  @Prop({ default: false }) readonly visible!: boolean
  @Prop() profile!: Profile
  baseURL = 'http://127.0.0.1:3001'
  showProgressModal = false
  target = ''
  user = ''
  password = ''
  task = ''

  runProfile() {
    this.$axios
      .get(`${this.baseURL}/run/${this.profile.id}`, {
        params: {
          target: this.target,
          user: this.user,
          password: this.password,
        },
      })
      .then(({ data }) => {
        this.task = data.taskID
        this.showProgressModal = true
      })
  }

  onProfileRunComplete() {
    this.showProgressModal = false
    this.$emit('close')
  }
}
</script>
