<template>
  <v-card>
    <v-card-title class="headline">
      <AddProfileModal
        :visible="showAddProfileModal"
        @addProfile="updateProfiles"
        @close="showAddProfileModal = false"
      />
      <v-row justify="space-between">
        <span class="pl-2"> Currently Installed Profiles </span>
        <v-icon
          title="Add Profile"
          class="mr-2"
          @click="showAddProfileModal = true"
        >
          mdi-plus
        </v-icon>
      </v-row>
    </v-card-title>
    <v-card-text>
      <div>
        <ProfileList :profiles="profiles" />
      </div>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import ProfileList, { Profile } from '~/components/ProfileList.vue'
import AddProfileModal from '~/components/Modals/AddProfile.vue'

@Component({
  components: {
    ProfileList,
    AddProfileModal,
  },
})
export default class Index extends Vue {
  baseURL = 'http://127.0.0.1:3001'
  profiles: Profile[] = []
  showAddProfileModal = false

  mounted() {
    this.updateProfiles()
  }

  updateProfiles() {
    this.$axios.get(`${this.baseURL}/profiles`).then(({ data }) => {
      this.profiles = data
    })
  }
}
</script>
