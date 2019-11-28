<template>
  <div class="container">
    <div class="header">Petadise</div>
    <div class="main">
      <p>Your Nickname</p>
      <!--<el-input v-model="input" placeholder="Enter your nickname"></el-input>-->
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
        <el-form-item prop="username">
          <el-input v-model="ruleForm.username"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="success" icon="el-icon-check" circle @click="confirmButton()"></el-button>
    </div>
    <div class="footer"></div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        username: ''
      },
      rules: {
        username: [
          {required: true, message: 'Please Enter a nickname', trigger: 'blur'},
          {min: 1, message: 'should have at least 1 character', trigger: 'blur'}
        ],
      },
      uniqueId: '',
      isNewUser: ''
    }
  },
  methods: {
    confirmButton: function () {
      this.axios.post('/users/unique-id', {username: this.ruleForm.username})
        .then(res => {
          this.uniqueId = res.data.uniqueId
          this.isNewUser = res.data.isNewUser
          this.$router.replace({name: 'Welcome', params: {username: this.ruleForm.username, uniqueId: this.uniqueId, isNewUser: this.isNewUser}})
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>

</style>
