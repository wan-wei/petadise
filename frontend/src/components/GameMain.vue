<template>
  <div class="container">
    <div class="header">PETADISE</div>
    <div class="main">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane :label="petNames[0] + '\(' + this.taskBacklogCounter[petNames[0]].total + '\)'" name="0"/>
        <el-tab-pane :label="petNames[1] + '\(' + this.taskBacklogCounter[petNames[1]].total + '\)'" name="1" v-if="petNames.length > 1"/>
        <el-tab-pane :label="petNames[2] + '\(' + this.taskBacklogCounter[petNames[2]].feed + '\)'" name="2" v-if="petNames.length > 2"/>
        <el-tab-pane :label="petNames[3] + '\(' + this.taskBacklogCounter[petNames[3]].feed + '\)'" name="3" v-if="petNames.length > 3"/>
        <el-tab-pane :label="petNames[4] + '\(' + this.taskBacklogCounter[petNames[4]].feed + '\)'" name="4" v-if="petNames.length > 4"/>
      </el-tabs>
      <div class="main-canvas">
        <div class="happiness-block">
          <span>Happiness</span>
          <div class="happiness-bar">
            <el-progress :percentage=happinessValue[petName] :text-inside="true" :stroke-width="26" />
          </div>
        </div>
        <div class="discovery-block">
          <p>{{tips}}</p>
        </div>
        <!--<div class="clock-block">-->
          <!--<AnalogClock :time=virtualTime size=50 borderWidth=1 scaleType="arabic" handType="line"/>-->
        <!--</div>-->
        <div class="animal-block">
          animal block
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="buttons-block">
        <div class="button-block">
          <el-badge class="new-alert" :value="taskBacklogCounter[petName].feed" v-if="taskBacklogCounter[petName].feed !== 0">
            <i class="staticButton flash el-icon-knife-fork" @click='interactionButton("feed")'></i>
          </el-badge>
          <i class="staticButton el-icon-knife-fork" v-if="taskBacklogCounter[petName].feed === 0" @click='interactionButton("feed")'></i>
            <!--<p>{{taskBacklogCounter.feed}}</p>-->
        </div>
        <div class="button-block">
          <el-badge class="new-alert" :value="taskBacklogCounter[petName].play" v-if="taskBacklogCounter[petName].play !== 0">
            <i class="staticButton flash el-icon-coordinate" @click='interactionButton("play")'></i>
          </el-badge>
          <i class="staticButton el-icon-coordinate" v-if="taskBacklogCounter[petName].play === 0" @click='interactionButton("play")'></i>
        </div>
        <div class="button-block">
          <el-badge class="new-alert" :value="taskBacklogCounter[petName].walk" v-if="taskBacklogCounter[petName].walk !== 0">
            <i class="staticButton flash el-icon-bicycle" @click='interactionButton("walk")'></i>
          </el-badge>
          <i class="staticButton el-icon-bicycle" v-if="taskBacklogCounter[petName].walk === 0" @click='interactionButton("walk")'></i>
        </div>
      </div>
      <div class="generate-report-block">
        <el-button type="primary" size="medium" @click="generateReportButton">Generate Report</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameMain',
  sockets: {
    taskAlert: function (data) {
      this.taskBacklogCounter[data.petName][data.type] += 1
      this.taskBacklogCounter[data.petName]['total'] += 1
      this.latestTaskUniqueId[data.petName][data.type] = data.uniqueTaskId
    }
  },
  data () {
    return {
      petIndex: this.$route.params.petIndex,
      activeName: this.$route.params.petIndex.toString(),
      virtualTime: '10:00:00',
      uniqueId: this.$route.params.uniqueId,
      petNames: JSON.parse(localStorage.getItem('petNames')),
      happinessValue: JSON.parse(localStorage.getItem('happinessValue')),
      taskBacklogCounter: JSON.parse(localStorage.getItem('taskBacklogCounter')),
      latestTaskUniqueId: JSON.parse(localStorage.getItem('latestTaskUniqueId')),
      petName: '',
      tips: ''
    }
  },
  methods: {
    handleClick: function (tab, event) {
      this.beforeLeave()
      this.$router.replace({name: 'BlankForJump', params: {petIndex: parseInt(tab.name), uniqueId: this.uniqueId}})
    },
    interactionButton: function (type) {
      this.taskBacklogCounter[this.petName]['total'] -= this.taskBacklogCounter[this.petName][type]
      this.taskBacklogCounter[this.petName][type] = 0
      this.beforeLeave()
      this.$router.replace({
        name: 'ItemPage',
        params: {
          uniqueId: this.uniqueId,
          petIndex: this.petIndex,
          type: type,
          taskUniqueId: this.latestTaskUniqueId[this.petName][type]
        }})
    },
    generateReportButton: function () {
      this.axios.post('/interaction/generate-suggestion', {uniqueId: this.uniqueId, petNames: this.petNames})
        .then(res => {
          this.$confirm(res.data.suggestion, 'Suggestion', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Keep playing',
            type: 'warning'
          }).then(() => {
            this.generateReport().then(res2 => {
              this.beforeLeave()
              this.$router.replace({
                name: 'MatchRateReport',
                params: {report: res2.data.report}
              })
            }).catch(err => {
              throw err
            })
          }).catch(err => {
            throw err
          })
        }).catch(e => {
          console.log(e)
        })
    },
    generateReport: function () {
      return this.axios.post('/interaction/generate-report', {uniqueId: this.uniqueId, petNames: this.petNames})
    },
    beforeLeave: function () {
      localStorage.setItem('taskBacklogCounter', JSON.stringify(this.taskBacklogCounter))
      localStorage.setItem('latestTaskUniqueId', JSON.stringify(this.latestTaskUniqueId))
      localStorage.setItem('happinessValue', JSON.stringify(this.happinessValue))
    }
    // timeDown () {
    //   let limitTime = this.limitTime
    //   if (limitTime <= 0) {
    //     this.stop = true
    //   }
    // }
  },
  mounted: function () {
    this.petName = this.petNames[this.petIndex]
    this.tips = this.$route.params.reason || '当呼吸灯闪烁时，说明' + this.petName + '需要你的帮助啦！'
    // this.$socket.emit('prepare_tasks', {uniqueId: this.uniqueId, petName: this.petName})
    // this.axios.get('/unique-id')
    //   .then(res => {
    //     this.uniqueId = res.data.uniqueId
    //   }).catch(e => {
    //     console.log(e)
    //   })
    // this.timeDown();
    // let time = setInterval(() => {
    //   if (this.stop === true) {
    //     clearInterval(time)
    //   }
    //   this.limitTime--
    //   this.timeDown()
    // }, 1000)
  }
}
</script>

<style scoped>
  .container {
    position: releative;
  }
  .main {
    bottom: 150px;
    border: 1px solid;
  }
  .main-canvas {
    border: 1px solid;
    background: url('../assets/home-inside-example.png') no-repeat;
    position: absolute;
    left: 10px;
    right: 10px;
    top: 50px;
    bottom: 30px;
  }
  .happiness-block {
    margin-top: 10px;
  }
  .happiness-bar {
    width: 70%;
    /*To make "Happiness" and the bar in the same line*/
    display: inline-block;
  }
  .discovery-block {
    border: 1px solid;
    /*These two to make the discovery block the same line with the clock block*/
    display: inline-block;
    width: 70%;
    height: 100px;
  }
  .clock-block {
    margin-right: 10px;
    float: right;
    border: 1px solid;
  }
  .animal-block {
    border: 1px solid;
    background: url('../assets/dog-image-example-removebg.jpeg') no-repeat;
    position: absolute;
    left: 60px;
    right: 60px;
    top: 150px;
    bottom: 50px;
  }
  .buttons-block {
    border: 1px solid;
    /*This line + generate-report-block.line-height + generate-report-block.margin-bottom=.footer.line-height*/
    line-height:100px;
    /*display: flex + flex: 1 to evenly separate block into 3*/
    display: flex;
  }
  .button-block {
    border: 1px solid;
    /*font-size to make the icon larger*/
    font-size: 60px;
    flex: 1;
  }
  .generate-report-block {
    line-height: 30px;
    margin-bottom: 10px;
  }
  @-webkit-keyframes flashAnimation {
    from { background-color: #1E90FF; -webkit-box-shadow: 0 0 0px #333; }
    50% { background-color: #63B8FF; -webkit-box-shadow: 0 0 40px #63B8FF; }
    to { background-color: #1E90FF; -webkit-box-shadow: 0 0 0px #333; }
  }
  .flash {
    /*border: 0px solid;*/
    /*color: white;*/
    /*border-radius: 50%;*/
    -webkit-animation-duration: 1.5s;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-name: flashAnimation;
  }
  .staticButton {
    border: 0px solid;
    color: white;
    border-radius: 50%;
    background-color: #1E90FF;
  }
  .new-alert {
    /*to make it on the top right*/
    line-height: 0px;
    border: 1px solid;
  }
  .footer {
    height:150px;
  /*border: 1px solid;*/
  }
</style>
