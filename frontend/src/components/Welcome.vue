<template>
  <div class="container">
    <div class="header">Petadise</div>
    <div class="main">
      <div class="welcome-block">
        <!--<p>{{username}}, Welcome to Petadice</p>-->
        <p>Welcome to Petadice</p>
      </div>
      <div class="entries-block">
        <div class="entry-block">
          <i class="icon el-icon-place" @click="petGameButton"></i>
          <p class="text">Pet Game</p>
        </div>
        <div class="entry-block">
          <i class="icon el-icon-location"></i>
          <p class="text">Shelter Location</p>
        </div>
        <div class="entry-block">
          <i class="icon el-icon-document"></i>
          <p class="text">Pet Info</p>
        </div>
      </div>
      <div class="entries-block">
        <div class="entry-block">
          <i class="icon el-icon-more"></i>
          <p class="text">Other</p>
        </div>
      </div>
    </div>
    <div class="footer">
    </div>
  </div>
</template>

<script>
export default {
  name: 'welcome',
  data () {
    return {
      // username: this.$route.params.username || 'Anonymous',
      // uniqueId: this.$route.params.uniqueId,
      // isNewUser: this.$route.params.isNewUser
      username: 'fake',
      uniqueId: '',
      isNewUser: true
    }
  },
  methods: {
    petGameButton: function () {
      console.log(this.isNewUser);
      if (this.isNewUser) {
        this.$router.replace({name: 'Questionnaire', params: {username: this.username, uniqueId: this.uniqueId, isNewUser: this.isNewUser}})
      } else {
        this.$router.replace({name: 'GameMain', params: {petIndex: 0, uniqueId: this.uniqueId}})
      }
    }
  },
  mounted: function () {
    this.axios.post('/users/unique-id')
      .then(res => {
        this.uniqueId = res.data.uniqueId
      }).catch(err => {
        console.log(err)
      })
  }
}
</script>

<style scoped>
  .welcome-block {
    /*border: 1px solid;*/
    /*margin-top: 50px;*/
    height: 100px;
  }
  .entries-block {
    /*border: 1px solid;*/
    /*margin-top: 50px;*/
    height: 120px;
    display: flex;
  }
  .icon {
    /*border: 1px solid;*/
    font-size: 60px;
  }
  .text {
    margin: 0;
    /*border: 1px solid;*/
  }
  .entry-block {
    /*border: 1px solid;*/
    flex: 1;
  }
  /*.footer {*/
    /*background-color: #B3C0D1;*/
    /*color: #333;*/
    /*height: 60px;*/
    /*!*border: 1px solid;*!*/
  /*}*/

</style>
