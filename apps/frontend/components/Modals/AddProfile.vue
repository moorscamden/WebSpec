<template>
  <Modal :visible="visible" :persistent="true" max-width="700px">
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
        <v-btn color="blue darken-1" text @click="$emit('close')">Cancel</v-btn>
        <v-btn color="blue darken-1" @click="addProfile">Add</v-btn>
      </v-card-actions>
    </v-card>
  </Modal>
</template>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import Modal from '~/components/Modals/Modal.vue'

@Component({
  components: {
    Modal,
  },
})
export default class AddProfileModal extends Vue {
  baseURL = 'http://127.0.0.1:3001'
  repository = ''
  @Prop({ default: false }) readonly visible!: boolean

  addProfile() {
    this.$axios
      .get(`${this.baseURL}/profiles/add`, {
        params: {
          repository: this.repository,
        },
      })
      .then(() => {
        this.$emit('addProfile')
        this.$emit('close')
      })
  }
}
</script>
