<template>
  <div class="container-tweet">
    <div id="tweet">
      <div class="tweet-content">
        <router-link :to="{ path: `/users/${tweetData.author._id}` }" tag="a">
          <div class="user-info">
            <!-- <p class="name">{{ tweetData.author.name }}</p> -->
              <el-avatar :src="tweetData.author.avatar || defaultAvatar"></el-avatar>
              <p class="username" v-show="tweetData.author.username">
                {{ (tweetData.author || {}).username }}
              </p>
              <span>•</span>
              <p class="date">
                {{ this.moment(tweetData.updatedAt).fromNow() }}
              </p>
          </div>
          <div class="tweet-body">
            <p>
              {{ tweetData.content }}
              <!-- <span class="hashtag">#{{ tweetData.author.username }}</span> -->
            </p>
          </div>
        </router-link>
        <div class="buttons">
          <template v-if="tweetData.author._id == user._id">
            <el-popconfirm
              title="want to delete？"
              confirm-button-text="yes"
              cancel-button-text="no"
              @confirm="handleDelete"
            >
              <!-- <el-button type="danger" icon="el-icon-delete" circle>删除</el-button> -->
              <el-button type="danger" circle slot="reference">
                <i class="el-icon-delete-solid"></i>
              </el-button>
            </el-popconfirm>

            <el-button type="primary" circle @click="dialogVisible = true">
              <i class="el-icon-edit"></i>
            </el-button>
          </template>
        </div>
      </div>
    </div>


    <el-dialog class="dialog-class" title="Update" visible v-if="dialogVisible" @close="dialogVisible = false">
      <div class="content">
        <CT isEdit :content="tweetData.content" @edit="handleEdit" />
      </div>
    </el-dialog>

  </div>
</template>

<script>
import axios from 'axios'
import CT from './CT'
import { mapActions, mapState, mapGetters } from 'vuex';
import moment from 'moment'

export default {
  name: 'tweet',
  data() {
    return {
      dialogVisible: false,
      defaultAvatar: 'https://i.pinimg.com/564x/76/64/46/766446e5ba21e74ea7ea0bb8cf688784.jpg'
    }
  },
  props: {
    tweetData: {
      type: Object
    }
  },
  components: {
    CT
  },
  computed: {
    ...mapState('tweet', ['tweet']),
    user() {
      return (this.$store.state.account || {}).user
    },
  },
  methods: {
    ...mapActions('tweet', [
      'likeTweet',
      'retweet',
      'delete',
      'edit_tweet'
    ]),
    async handleDelete() {
      await this.delete(this.tweetData._id);
    },
    async handleEdit(data) {
      console.log(data, 'data')
      const rest = await this.edit_tweet({tweetId: this.tweetData._id, data});
      this.dialogVisible = false;
    }
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.container-tweet {
  border: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  margin-bottom: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.08);
  .username {
    color: #333 !important;
    font-weight: 500;
    margin-left: 10px;
  }
}
#tweet {
  display: flex;
  align-items: flex-start;
  padding: 1rem 16px 11px;
  // cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  img {
    margin-right: 1rem;
    border-radius: 50%;
    width: 48px;
    height: 48px;
  }
  .tweet-content {
    width: 100%;
    .user-info {
      display: flex;
      align-items: flex-start;
      align-items: center;
      margin-bottom: 11px;
      a {
        cursor: pointer;
        display: flex;
        align-items: flex-start;
      }
      * {
        margin-right: 4px;
        line-height: 17.58px;
        font-size: 15px;
        color: #828282;
      }
      .name {
        font-weight: 700;
        color: #000;
      }
      span {
        color: #828282;
      }
    }

    .tweet-body {
      margin-bottom: 11px;
      p {
        font-size: 15px;
        line-height: 22px;
        color: #333333;
      }
      .hashtag {
        color: #1da1f2;
      }
      .hashtag:hover {
        text-decoration: underline;
      }
    }

    .buttons {
      height: 40px;
      display: flex;
      justify-content: flex-end;
      width: 100%;
      #reply:hover {
        svg {
          fill: rgba(#1da1f2, 0.8);
          background-color: rgba(#1da1f2, 0.08);
          border-radius: 100px;
        }

        span {
          color: rgba(#1da1f2, 0.8);
        }
      }
      #retweet:hover {
        svg {
          fill: rgba(green, 0.8);
          background-color: rgba(green, 0.08);
          border-radius: 100px;
        }

        span {
          color: rgba(green, 0.8);
        }
      }

      #like {
        button {
          background-color: transparent;
        }
      }
      #like:hover {
        svg {
          fill: rgba(red, 0.8);
          background-color: rgba(red, 0.08);
          border-radius: 100px;
        }

        span {
          color: rgba(red, 0.8);
        }
      }
      #share:hover {
        svg {
          fill: rgba(#1da1f2, 0.8);
          background-color: rgba(#1da1f2, 0.08);
          border-radius: 50%;
        }

        span {
          color: rgba(green, 0.8);
        }
      }
      ::v-deep .el-button {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 10px;
        svg {
          box-sizing: content-box;
          cursor: pointer;
          width: 18px;
          padding: 0.5rem;
          margin-right: 4px;
        }
        span {
          font-size: 14px;
        }
      }
    }
  }
  .el-icon-delete {
    color: #333;
  }
}

.dialog-class {
  .content {
    margin-top: -20px;
    ::v-deep #zone-blog {
      // border-top: none;
      // border-bottom: none;
      padding: 0;
      box-shadow: none;
    }
  }
}

@media (max-width: 476px) {
  #tweet {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
}
.button {
  cursor: pointer;
}
</style>
