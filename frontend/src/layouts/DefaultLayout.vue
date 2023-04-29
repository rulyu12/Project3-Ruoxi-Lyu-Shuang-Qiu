<template>
  <div class="layout">
    <HeaderCnt />
    <div class="container">
      <div class="grid grid-center">
        <div class="col col-12 col-xs-12 col-md-9 col-lg-6">
          <router-view id="router-view" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderCnt from '../components/Header.vue'

export default {
  name: 'default_layout',
  components: {
    HeaderCnt
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.sidebar_left_container {
  max-width: 260px;
}

.router_view_container {
  max-width: 600px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  padding: 0 !important;
}

.sidebar_right_container {
  max-width: 350px;
}

</style>
