<template>
  <div class="login-page">
    <router-view id="router-view" />
  </div>
</template>

<script>
import Login from '../views/Login.vue'

export default {
  name: 'auth_layout',
  components: {
    Login
  }
}
</script>

<style lang="scss" scoped>
#router-view {
  flex: auto;
  max-width: 600px;
  // flex-grow: 40;
}
</style>
