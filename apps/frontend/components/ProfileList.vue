<template>
  <div>
    <v-data-table :headers="headers" :items="profiles">
      <template #[`item.actions`]="{ item }">
        <v-icon
          small
          title="Run"
          class="mr-2"
          @click="showRunProfileModal = true"
        >
          mdi-play
        </v-icon>
        <v-icon small title="Update" class="mr-2"> mdi-refresh </v-icon>
        <v-icon small title="Delete" class="mr-2"> mdi-delete </v-icon>
        <RunProfileModal
          :visible="showRunProfileModal"
          :profile="item"
          @close="showRunProfileModal = false"
        >
        </RunProfileModal>
      </template>
    </v-data-table>
  </div>
</template>
<script lang="ts">
import Component from 'vue-class-component'
import Vue from 'vue'
import { Prop } from 'vue-property-decorator'
import RunProfileModal from '~/components/Modals/RunProfile.vue'

export type Profile = {
  id: number
  filename: string
  repo: string
  path: string
  createdAt: Date
  updatedAt: Date
}

@Component({
  components: {
    RunProfileModal,
  },
})
export default class ProfileList extends Vue {
  @Prop() profiles?: Profile[]

  showRunProfileModal = false

  headers = [
    {
      text: 'Profile Name',
      align: 'start',
      value: 'filename',
    },
    {
      text: 'Repository',
      value: 'repo',
    },
    {
      text: 'Created At',
      value: 'createdAt',
    },
    {
      text: 'Updated At',
      value: 'updatedAt',
    },
    {
      text: 'Actions',
      value: 'actions',
    },
  ]
}
</script>
