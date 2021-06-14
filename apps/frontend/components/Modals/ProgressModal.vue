<template>
  <Modal :visible="visible" max-width="600px">
    <v-card>
      <v-progress-linear v-show="!completed" indeterminate />
      <v-card-title>Running...</v-card-title>
      <v-card-text>
        <pre>{{ currentStatus }}
<span v-if="completed">View: <a :href="'http://127.0.0.1:8080/results?url='+resultURL+'&filename=result.json'" target="_blank">Here</a></span></pre>
      </v-card-text>
      <v-card-actions
        ><v-spacer /><v-btn
          color="blue darken-1"
          text
          :disabled="!completed"
          @click="$emit('close')"
          >Close</v-btn
        >
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
export default class ProgressModal extends Vue {
  @Prop({ default: false }) readonly visible!: boolean
  @Prop({ default: '' }) readonly task!: string
  baseURL = 'http://127.0.0.1:3001'
  resultURL = ''
  completed = false

  mounted() {
    this.refresh()
  }

  get currentStatus() {
    return `Task ID: ${this.task}\nCompleted: ${this.completed}`
  }

  refresh() {
    setTimeout(() => {
      this.$axios.get(`${this.baseURL}/tasks/${this.task}`).then(({ data }) => {
        this.completed = data.completed
        if (this.completed) {
          this.resultURL = data.url
        }
      })
      if (!this.completed) {
        this.refresh()
      }
    }, 5000)
  }
}
</script>
