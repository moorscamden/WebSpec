<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-card>
        <v-card-title class="headline">
          <v-row justify="space-between">
            <span class="pl-2"> Currently Installed Profiles </span>
            <AddProfileModal @addProfile="updateProfiles" />
          </v-row>
        </v-card-title>
        <v-card-text>
          <div>
            <ProfileList :profiles="profiles" />
          </div>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
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
