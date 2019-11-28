<template>
  <div class="container">
    <div class="header">Recommendation</div>
    <div class="main">
      <div class="intro-block" v-for="item in petCandidates">
        <div class="picture-out">
          <div class="picture-in"></div>
        </div>
        <div class="name">
          <p class="text">{{item.petName}}</p>
        </div>
        <div class="intro">
          <p>{{item.intro}}</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <el-button type="primary" round @click="startGame">Start Game</el-button>
    </div>
  </div>
</template>

<script>
import initializeModule from '@/components/Function-Initialize'

export default {
  name: 'pet-candidates',
  data () {
    return {
      uniqueId: this.$route.params.uniqueId,
      petCandidates: this.$route.params.petCandidates
      // petCandidates: this.$route.params.petCandidates || [{petName: 'Frankie', intro: 'fsfsdfsdfsfsd'}, {petName: 'Mikky', intro: 'xxx'}]
      // petCandidates: this.$route.params.petCandidates || [{petName: 'Frankie', intro: 'fsfsdfsdfsfsd'}]
    }
  },
  methods: {
    startGame: function () {
      var petNames = []
      for (var i = 0; i < this.petCandidates.length; i++) {
        petNames.push(this.petCandidates[i].petName)
        this.$socket.emit('prepare_tasks', {uniqueId: this.uniqueId, petName: this.petCandidates[i].petName})
      }
      initializeModule.initialize(petNames)
      this.$router.replace({name: 'GameMain', params: {petIndex: 0, uniqueId: this.uniqueId}})
    }
  }
}
</script>

<style scoped>
  .intro-block {
    /*border: 1px solid;*/
    height: 150px;
    margin-left: 10px;
    margin-right: 10px;
    /*display: flex;*/
  }
  .picture-out {
    height: 150px;
    width: 120px;
    float: left;
    /*border: 1px solid;*/
    /*flex: 1;*/
  }
  .picture-in {
    height: 100px;
    top: 25px;
    width: 100px;
    border-radius: 50%;
    /*border: 1px solid;*/
    background: url('../assets/dog-food-image-example.jpg') no-repeat center;

  }
  .name {
    /*border: 1px solid;*/
    margin-top: 25px;
    text-align: left;
  }
  .text {
    margin: 0px;
  }
  .intro {
    /*border: 1px solid;*/
    height: 100px;
    margin-right: 30px;
    overflow-y: auto;
    text-align: left;
    word-wrap:break-word;
  }

</style>
