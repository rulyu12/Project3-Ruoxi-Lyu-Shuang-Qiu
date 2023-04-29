<template>
  <Tweet :tweetData="tweet" />
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Tweet from '../components/Tweet'
export default {
  name: 'TweetDetail',
  components: {
    Tweet
  },
  data() {
    return {
      loading: false,
      backendErrors: null
    }
  },
  computed: {
    ...mapState('tweet', ['tweet'])
  },
  methods: {
    ...mapActions('tweet', ['fetch_tweet'])
  },
  async created() {
    await this.fetch_tweet(this.$route.params.tweetId)
  }
}
</script>

<style lang="scss" scoped></style>
