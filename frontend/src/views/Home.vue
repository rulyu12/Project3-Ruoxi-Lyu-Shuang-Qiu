<script>
import CreateTweet from '@/components/CreateTweet'
import Tweet from '@/components/Tweet'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
      errMessage: '',
      isLoading: true
    }
  },
  components: {
    CreateTweet,
    Tweet
  },
  computed: {
    ...mapState('tweet', ['tweets']),
    ...mapGetters('account', ['user'])
  },
  watch: {
    user(val) {
      console.log('Home~24 val：', val);
    }
  }
}
</script>

<template>
  <div id="home-page" class="home">
    <CreateTweet />
    <p v-if="errMessage">{{ errMessage }}</p>
    <p v-else-if="!tweets && tweets.length < 0">Please wait..⌛️.</p>
    <div v-else>
      <ul v-for="tweet in tweets" :key="tweet.id">
        <Tweet :tweetData="tweet" />
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home {
  .title {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    h3 {
      font-weight: 900;
      font-size: 23px;
      line-height: 22.27px;
      color: #000;
      cursor: pointer;
    }
    img {
      cursor: pointer;
    }
  }
}
</style>
