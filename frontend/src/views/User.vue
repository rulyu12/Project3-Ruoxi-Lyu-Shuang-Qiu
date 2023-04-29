<template>
  <div class="user-page">
    <el-card class="user-card" shadow="hover">
      <div class="user-line">
        <h5 class="user-name">{{ currentUser.username }}</h5>
      </div>
      <p class="join-time">
        <i class="el-icon-date"></i>&#x3000;join in
        {{ moment(currentUser.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
      </p>
      <p class="desc">{{ currentUser.description || '-' }}</p>
    </el-card>
    <div class="blog-content">
      <div v-for="(item, index) in userBlogList" :key="index">
        <Twetter :tweetData="item" />
      </div>
    </div>
  </div>
</template>

<script>
import Twetter from '../components/Tweet.vue'
import axios from 'axios'

export default {
  data() {
    return {
      userBlogList: []
    }
  },
  computed: {
    currentUser() {
      return this.userBlogList?.[0]?.author || {}
    }
  },
  components: {
    Twetter
  },
  methods: {
    async handleGetUserBlogList() {
      const res = await axios({
        method: 'get',
        url: '/api/blog/getUserTweet',
        params: {
          id: this.$route.params.userId
        }
      })
      const { data } = res
      this.userBlogList = data
    }
  },
  mounted() {
    this.handleGetUserBlogList()
  }
}
</script>

<style scoped lang="scss">
.user-page {
  .blog-content {
    margin-top: 20px;
  }
  .user-card {
    cursor: pointer;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .user-name {
      font-size: 20px;
      line-height: 30px;
    }
    .join-time {
      font-size: 10px;
      line-height: 20px;
      color: #666;
      // text-align: right;
    }
    .desc {
      font-size: 16px;
      margin-top: 10px;
    }
  }
}
</style>
