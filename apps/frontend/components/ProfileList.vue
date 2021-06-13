<template>
  <div>
    <v-data-table :headers="headers" :items="profiles">
      <template #[`item.actions`]="{ item }">
        <RunProfileModal :profile="item"> </RunProfileModal>
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

  headers = [
    {
      text: 'Filename',
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
