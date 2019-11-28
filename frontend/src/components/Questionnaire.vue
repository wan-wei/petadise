<template>
  <div class="container">
    <div class="header">Questionnare</div>
    <div class="main">
      <div class="main-canvas">
        <div class="title">
          <p>Help us know more about you</p>
        </div>
        <div class="questionnaire-block">
          <p v-if="!showQuestionnaireSwitch">{{explanation}}</p>
          <div class="questionnaire" v-if="showQuestionnaireSwitch">
            <div v-for="(value, key) in questionnaire">
              <p>{{value.question}}</p>
              <el-checkbox-group v-model="answer[key]" v-for="(item, i) in value.choices" class="checkbox">
                <el-checkbox :label="item"></el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div v-if="!showQuestionnaireSwitch">
        <el-button type="primary" @click="quitButton">Quit</el-button>
        <el-button type="primary" @click="agreeButton">I agree, start the questionnaire</el-button>
      </div>
      <div v-if="showQuestionnaireSwitch">
        <el-button type="primary" @click="submitButton">Submit</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'questionnaire',
  data () {
    return {
      username: this.$route.params.username || 'Anonymous',
      uniqueId: this.$route.params.uniqueId,
      isNewUser: this.$route.params.isNewUser,
      explanation: 'Before the game, to give you a good experience, we want you to finish several questions to let us know more about your pet preference. Trust me, an adorable pet is worth your two minutes :)',
      showQuestionnaireSwitch: false,
      questionnaire: null,
      answer: {},
      petCandidates: null
    }
  },
  methods: {
    quitButton: function () {
      this.$router.replace({name: 'Welcome', params: {username: this.username, uniqueId: this.uniqueId, isNewUser: this.isNewUser}});
    },
    agreeButton: function () {
      this.axios.get('/pet-info/questionnaire-questions')
        .then(res => {
          this.questionnaire = res.data.questionnaire
          for (var key in this.questionnaire) {
            this.$set(this.answer, key, [])
          }
          this.showQuestionnaireSwitch = true
        }).catch(err => {
          console.log(err)
        })
    },
    submitButton: function () {
      this.axios.post('/pet-info/pet-candidates', {questionnaire: this.answer})
        .then(res => {
          if (res.data.petCandidates.length > 0) {
            this.petCandidates = res.data.petCandidates
            this.$router.replace({name: 'PetCandidates', params: {uniqueId: this.uniqueId, petCandidates: this.petCandidates}})
          } else {
            this.$alert('Sorry, we currently don\'t have eligible pets. Can you try different constrains again?', ':(', {
              confirmButtonText: 'OK'
            })
          }
        }).catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped>
  .main {
    background-color: #B3C0D1;
  }
  .main-canvas {
    /*border: 1px solid;*/
    background-color: white;
    position: absolute;
    left: 20px;
    right: 20px;
    top: 0px;
    bottom: 50px;
  }
  .title {
    border: 1px solid;
  }
  .questionnaire-block {
    /*border: 1px solid;*/
    margin-left: 10px;
    margin-right: 10px;
    text-align: left;
  }
  .checkbox {
    display: inline-grid;
    width: 80px;

  }

</style>
