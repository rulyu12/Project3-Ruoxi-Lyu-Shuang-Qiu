<template>
  <form id="zone-blog" @submit="submitCT">
    <div class="input-context">
      <el-input
        type="textarea"
        :autosize="false"
        placeholder="What's happening"
        v-model="tweet"
        maxlength="300"
        show-word-limit
      />
      <div class="icons">
        <div class="right-icon">
          <button type="primary" html-type="submit" block="block">
            submit
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CT',
  components: {
  },
  props: {
    isEdit: Boolean,
    content: String
  },
  data() {
    return {
      tweet: '',
      loading: false,
    }
  },
  computed: {
    ...mapGetters('account', ['user'])
  },
  created() {
    if (this.content && this.content.length) this.tweet = this.content;
  },
  methods: {
    ...mapActions('tweet', ['create_tweet']),
    ...mapActions('tweet', ['fetch_tweets']),
    async submitCT(e) {
      e.preventDefault()
      this.loading = false
      if (!this.tweet.trim()) {
        return this.$message.error('blog cannot be empty!');
      }
      try {
        if (this.isEdit) {
          this.$emit('edit', {
            content: this.tweet,
            user: this.user
          });
        } else {
          await this.create_tweet({
            content: this.tweet,
            user: this.user
          })
        }
        this.tweet = ''
      } catch (e) {
        this.$message.error((e.response || {}).data || 'network error');
      } finally {
        this.loading = false
        this.fetch_tweets()
      }
    }
  }
}
</script>

<style scoped lang="scss">
#zone-blog {
  border: 1px solid rgba(0, 0, 0, 0.08);
  // width: 600px;
  padding-left: 1rem;
  padding-top: 8px;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  img.avatar-image {
    margin-right: 1rem;
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }
  .input-context {
    margin-right: 2rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    ::v-deep .el-textarea {
      margin: 5px 0;
      .el-textarea__inner {
        height: 80px!important;
        resize: none;
        border: none;
      }
    }
    input {
      color: #828282;
      font-weight: 400;
      // line-height: 22.27px;
      font-size: 19px;
      // padding: 1rem 1rem 40px 1rem;
    }
    input:active {
      outline: none;
      border: none;
    }
    input:focus {
      outline: 0;
      color: #000;
      font-weight: 500;
    }

    .icons {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 22px;
      .left-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        svg {
          border-radius: 50%;
          padding: 0.5rem;
          box-sizing: content-box;
          &:hover {
            background-color: rgba(#1da1f2, 0.1);
          }
        }
      }

      .right-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        button {
          margin-right: 0px;
          background-color: #1da1f2;
          width: 98px;
          height: 42px;
          border-radius: 100px;
          font-weight: 700;
          font-size: 15px;
          line-height: 17.58px;
          cursor: pointer;
          color: #fff;
          transition: 1s color, 1s background-color;
        }
        button:hover {
          color: #1da1f2;
          background-color: #fff;
          border: 1px solid #1da1f2;
        }
        button:active {
          outline: none;
          border: none;
        }
        button:focus {
          outline: 0;
        }
        button:disabled {
          background-color: #e6e6e6;
          color: #828282;
        }
      }
    }
  }
}

@media (max-width: 758px) {
  #zone-blog {
    width: 100%;
  }
}

@media (max-width: 476px) {
  #zone-blog {
    display: none;
  }
}
</style>
