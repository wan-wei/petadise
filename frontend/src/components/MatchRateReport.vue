<template>
  <div class="container">
    <div class="header">Match Rate Report</div>
    <div class="main">
      <div class="tips-block">
        <p>{{description}}</p>
      </div>
      <el-divider class="divider"/>
      <!--<template :v-for="key in report">-->
        <!--<div class="info-block">-->
          <!--<p>{{key}}</p>-->
          <!--<el-rate-->
            <!--v-model="report[key]"-->
            <!--disabled-->
            <!--show-score-->
            <!--text-color="#ff9900"-->
            <!--score-template="{value}">-->
          <!--</el-rate>-->
          <!--<el-button type="primary">More Info</el-button>-->
        <!--</div>-->
      <!--</template>-->
      <div class="info-block">
        <p>{{petNames[0]}}</p>
        <el-rate
          v-model="report[petNames[0]]"
          disabled
          show-score
          text-color="#ff9900">
          <!--score-template="{value}">-->
        </el-rate>
        <el-button type="primary">More Info</el-button>
      </div>
      <div class="info-block">
        <p>{{petNames[1]}}</p>
        <el-rate
          v-model="report[petNames[1]]"
          disabled
          show-score
          text-color="#ff9900">
          <!--score-template="{value}">-->
        </el-rate>
        <el-button type="primary">More Info</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'match-rate-report',
  data () {
    return {
      description: "The match rate is calculated based on your living habits, behaviour patterns and pets' daily routines. The higher the rate is, the more likely the pet is to be your best partner.",
      // petNames: ['Frankie', 'Mikky'],
      // matchRates: {'Frankie': 4, 'Mikky': 3.8}
      report: this.$route.params.report,
      // report: {'Frankie': 4, 'Mikky': 3.8},
      petNames: []
    }
  },
  mounted: function () {
    for (let key in this.report) {
      this.petNames.push(key)
    }
  }
}
</script>

<style scoped>
  .tips-block {
    border: 1px solid;
    display: inline-block;
    width: 95%;
    height: 110px;
    text-align: left;
  }
  .info-block {
    border: 1px solid;
  }
</style>
