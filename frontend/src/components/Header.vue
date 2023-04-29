<template>
  <el-header class="header-component">
    <div class="container">
      <div class="left">
        <el-button class="home-btn" v-if="isHome" type="text" size="medium" @click="goHome">
          <i class="el-icon-s-home"></i>
        </el-button>
      </div>
      <div class="right">
        <el-dropdown v-if="user">
          <span class="el-dropdown-link">
            {{ user.name }}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="logout">logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="flex-item" v-else>
          <el-button type="text" @click="goSignUp">Sign Up</el-button>
          <el-button class="login-btn" size="small" type="primary" round @click="goLogin">Login</el-button>
        </div>
      </div>
    </div>
  </el-header>
</template>

<script>
export default {
  computed: {
    user() {
      return (this.$store.state.account || {}).user
    },
    isHome() {
      return this.$route.path !== '/'
    },
    showUser() {
      return this.$route?.meta?.showUser && this.user.name
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    goSignUp() {
      this.$router.push('/register')
    },
    goLogin() {
      this.$router.push('/login')
    },
    logout() {
      this.$store.commit('account/set_user', null)
    }
  }
}
</script>
<style scoped lang="scss">
.header-component {
  background-color: #fff;
  border-bottom: 1px solid #eee;
  position: sticky;
  top: 0;
  margin-bottom: 10px;
  z-index: 99;
  .home-btn {
    font-size: 30px;
  }
  .container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    .flex-item {
      height: 100%;
      display: flex;
      align-items: center;
      .login-btn {
        margin-left: 10px;
      }
    }
  }
}
</style>
