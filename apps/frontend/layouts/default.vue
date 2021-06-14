<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="false"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="false" fixed app>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Installed Profiles',
          to: '/',
        },
        {
          icon: 'mdi-plus',
          title: 'Public Profiles',
          to: '/public',
        },
        {
          icon: 'mdi-history',
          title: 'Results',
          to: '/results',
        },
        {
          icon: 'mdi-account',
          title: 'Identities',
          to: '/identities',
        },
        {
          icon: 'mdi-server-network',
          title: 'Targets',
          to: '/targets',
        },
        {
          icon: 'mdi-text-box-multiple-outline',
          title: 'Inputs',
          to: '/inputs',
        },
        {
          icon: 'mdi-clock',
          title: 'Scheduled Scans',
          to: '/schedule',
        },
      ],
      miniVariant: true,
      title: 'WebSpec',
    }
  },
}
</script>
